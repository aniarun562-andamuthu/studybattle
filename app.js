/**
 * ==========================================================================
 * STUDY BATTLE - Core Application Engine (app.js)
 * Manages State, LocalStorage, Web Audio SFX, Toasts, Modals & Navigation
 * 
 * NOTE FOR FLASK / SQLITE INTEGRATION:
 * The localStorage calls below are designed to be replaced with asynchronous
 * fetch() calls to Flask endpoints (e.g. /api/user/profile, /api/user/stats).
 * ==========================================================================
 */

const STORAGE_KEYS = {
  USER: 'sb_user_profile',
  HISTORY: 'sb_battle_history',
  SETTINGS: 'sb_user_settings',
  ACHIEVEMENTS: 'sb_achievements'
};

// --------------------------------------------------------------------------
// 1. STATE & STORAGE MANAGEMENT
// --------------------------------------------------------------------------

/**
 * Retrieves the current user profile from localStorage or initializes default
 * FLASK INTEGRATION: Replace with `const res = await fetch('/api/user/profile'); return await res.json();`
 */
function getUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    if (!data) {
      saveUser(DEFAULT_USER);
      return JSON.parse(JSON.stringify(DEFAULT_USER));
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading user state:', e);
    return JSON.parse(JSON.stringify(DEFAULT_USER));
  }
}

/**
 * Persists the user profile to localStorage
 * FLASK INTEGRATION: Replace with `await fetch('/api/user/profile', { method: 'PUT', body: JSON.stringify(user) });`
 */
function saveUser(user) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    renderUserHeaderStats();
  } catch (e) {
    console.error('Error saving user state:', e);
  }
}

/**
 * Retrieves battle history
 * FLASK INTEGRATION: Replace with `fetch('/api/battles/history')`
 */
function getBattleHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(DEFAULT_BATTLE_HISTORY));
      return JSON.parse(JSON.stringify(DEFAULT_BATTLE_HISTORY));
    }
    return JSON.parse(data);
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_BATTLE_HISTORY));
  }
}

/**
 * Saves a new battle record to history
 * FLASK INTEGRATION: Replace with `fetch('/api/battles', { method: 'POST', body: JSON.stringify(record) })`
 */
function addBattleHistory(record) {
  const history = getBattleHistory();
  history.unshift(record);
  if (history.length > 50) history.pop();
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}

/**
 * Retrieves achievements status
 */
function getAchievements() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(DATA_ACHIEVEMENTS));
      return JSON.parse(JSON.stringify(DATA_ACHIEVEMENTS));
    }
    return JSON.parse(data);
  } catch (e) {
    return JSON.parse(JSON.stringify(DATA_ACHIEVEMENTS));
  }
}

/**
 * Saves achievements status
 */
function saveAchievements(achievements) {
  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
}

/**
 * Awards XP, handles Level-ups, and checks daily goal
 */
function awardUserXP(amount) {
  const user = getUser();
  user.xp = (user.xp || 0) + amount;
  user.dailyEarnedXp = (user.dailyEarnedXp || 0) + amount;
  user.xpCurrentLevel = (user.xpCurrentLevel || 0) + amount;

  // Level up calculation: Each level requires level * 150 XP
  let requiredForNext = (user.level || 1) * 150;
  if (user.xpCurrentLevel >= requiredForNext) {
    user.level += 1;
    user.xpCurrentLevel -= requiredForNext;
    user.xpRequiredLevel = (user.level) * 150;
    
    // Level title assignment
    const titles = ['Novice Fighter', 'Apprentice Coder', 'Script Warrior', 'Code Gladiator', 'Syntax Sorcerer', 'Tech Champion', 'Code Grandmaster'];
    user.levelTitle = titles[Math.min(user.level - 1, titles.length - 1)];

    saveUser(user);
    playAudio('levelup');
    showToast(`🎉 LEVEL UP! You reached Level ${user.level} (${user.levelTitle})!`, 'xp', 6000);
  } else {
    saveUser(user);
  }
}

// --------------------------------------------------------------------------
// 2. SYNTHESIZED WEB AUDIO SFX (Zero external mp3 files required)
// --------------------------------------------------------------------------
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays procedural sound effects using Web Audio API
 */
function playAudio(type) {
  const user = getUser();
  if (user && user.settings && user.settings.soundEnabled === false) {
    return;
  }

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case 'click':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;

      case 'correct':
        // Ascending harmonic chord
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
        break;

      case 'wrong':
        // Low descending buzz
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(130, now + 0.25);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
        break;

      case 'victory':
        // Fanfare chord
        playFanfare(ctx, now);
        break;

      case 'levelup':
        playLevelUpFanfare(ctx, now);
        break;

      default:
        break;
    }
  } catch (err) {
    // Audio context may be blocked by browser autoplay policy until interaction
  }
}

function playFanfare(ctx, now) {
  const notes = [440, 554.37, 659.25, 880];
  notes.forEach((freq, idx) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(freq, now + idx * 0.09);
    g.gain.setValueAtTime(0.1, now + idx * 0.09);
    g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.3);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(now + idx * 0.09);
    o.stop(now + idx * 0.09 + 0.3);
  });
}

function playLevelUpFanfare(ctx, now) {
  const notes = [392, 523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, idx) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, now + idx * 0.08);
    g.gain.setValueAtTime(0.15, now + idx * 0.08);
    g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(now + idx * 0.08);
    o.stop(now + idx * 0.08 + 0.4);
  });
}

// --------------------------------------------------------------------------
// 3. TOAST NOTIFICATION SYSTEM
// --------------------------------------------------------------------------
function ensureToastContainer() {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
}

/**
 * Displays an animated toast message
 * @param {string} message - Message text
 * @param {'success'|'error'|'info'|'xp'} type - Toast styling category
 * @param {number} duration - Milliseconds before auto-dismiss
 */
function showToast(message, type = 'info', duration = 3500) {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';
  if (type === 'xp') icon = '⚡';

  toast.innerHTML = `
    <span style="font-size: 1.2rem;">${icon}</span>
    <span style="flex: 1; font-weight: 500;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// --------------------------------------------------------------------------
// 4. MODAL MANAGEMENT
// --------------------------------------------------------------------------
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    playAudio('click');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    playAudio('click');
  }
}

// Attach click listeners to modal close buttons and outside overlay
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      closeModal(modalId);
    });
  });
});

// --------------------------------------------------------------------------
// 5. HEADER & SIDEBAR STATS SYNCHRONIZATION
// --------------------------------------------------------------------------
function renderUserHeaderStats() {
  const user = getUser();
  if (!user) return;

  // Apply Theme preference
  if (user.settings && user.settings.theme === 'high-contrast') {
    document.body.classList.add('theme-high-contrast');
  } else {
    document.body.classList.remove('theme-high-contrast');
  }

  // Header user pills
  const xpEl = document.getElementById('headerUserXp');
  if (xpEl) xpEl.textContent = `${user.xp ? user.xp.toLocaleString() : 0} XP`;

  const streakEl = document.getElementById('headerUserStreak');
  if (streakEl) streakEl.textContent = `${user.streak || 1} Days`;

  const levelEl = document.getElementById('headerUserLevel');
  if (levelEl) levelEl.textContent = `Lvl ${user.level || 1}`;

  // User names across pages
  document.querySelectorAll('.user-display-name').forEach(el => {
    el.textContent = user.name || 'Alex Hunter';
  });

  document.querySelectorAll('.user-display-level').forEach(el => {
    el.textContent = `Level ${user.level || 1} • ${user.levelTitle || 'Code Gladiator'}`;
  });

  document.querySelectorAll('.user-display-email').forEach(el => {
    el.textContent = user.email || 'alex.hunter@studybattle.dev';
  });

  // Sound toggle button in header if present
  const soundBtn = document.getElementById('headerSoundToggle');
  if (soundBtn) {
    const isSound = user.settings ? user.settings.soundEnabled !== false : true;
    soundBtn.title = isSound ? 'Sound SFX: ON (Click to Mute)' : 'Sound SFX: OFF (Click to Enable)';
    soundBtn.style.opacity = isSound ? '1' : '0.45';
  }
}

// --------------------------------------------------------------------------
// 6. SIDEBAR MOBILE DRAWER TOGGLE & NAVIGATION HIGHLIGHTING
// --------------------------------------------------------------------------
function setupNavigation() {
  // Mobile drawer hamburger
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const sidebar = document.querySelector('.app-sidebar');
  let backdrop = document.querySelector('.sidebar-backdrop');

  if (!backdrop && sidebar) {
    backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);
  }

  if (toggleBtn && sidebar && backdrop) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      backdrop.classList.toggle('active');
    });

    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('active');
    });
  }

  // Active navigation link highlighting based on pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Header sound button quick toggle
  const soundBtn = document.getElementById('headerSoundToggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const user = getUser();
      user.settings = user.settings || {};
      user.settings.soundEnabled = !user.settings.soundEnabled;
      saveUser(user);
      playAudio('click');
      showToast(user.settings.soundEnabled ? '🔊 Sound effects enabled' : '🔇 Sound effects muted', 'info');
    });
  }
}

// --------------------------------------------------------------------------
// 7. STUDY RESOURCE PREVIEW MODAL HELPER (For Screen 9 & General Use)
// --------------------------------------------------------------------------
function openStudyResourceModal(subjectId = 'python') {
  let modal = document.getElementById('resourcePreviewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'resourcePreviewModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box" style="max-width: 640px;">
        <div class="modal-header">
          <div class="modal-title" id="resourceModalTitle">📖 Study Resource Guide</div>
          <span class="modal-close-btn" data-close-modal="resourcePreviewModal">&times;</span>
        </div>
        <div class="modal-body" id="resourceModalBody">
          <!-- Dynamic Content Loaded Below -->
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-close-modal="resourcePreviewModal">Close</button>
          <button class="btn btn-primary" id="resourceSimulateDownloadBtn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download PDF / Cheat Sheet
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('[data-close-modal="resourcePreviewModal"]').addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.querySelector('.btn-secondary').addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Curated revision points for clean preview
  const guides = {
    python: {
      title: '🐍 Python Quick Battle Study Guide',
      content: `
        <div style="background: rgba(139,92,246,0.1); border-left: 3px solid var(--accent-purple); padding: 0.75rem 1rem; margin-bottom: 1rem; border-radius: 4px;">
          <strong>Quick Concept Review:</strong> Focus on Mutability, List Comprehensions, and Function Scope.
        </div>
        <ul style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem;">
          <li>🔹 <strong>Tuples vs Lists:</strong> Tuples <code>(1, 2)</code> are immutable. Lists <code>[1, 2]</code> are mutable.</li>
          <li>🔹 <strong>List Comprehensions:</strong> <code>[x*2 for x in items if x > 0]</code> is faster and more idiomatic than standard loops.</li>
          <li>🔹 <strong>*args & **kwargs:</strong> <code>*args</code> collects positional arguments as a tuple; <code>**kwargs</code> collects keyword arguments as a dictionary.</li>
          <li>🔹 <strong>OOP Constructor:</strong> <code>def __init__(self, ...)</code> initializes instance attributes.</li>
        </ul>
        <div class="code-snippet mt-1"># Python Quick Recall:\nsquares = {n: n**2 for n in range(1, 4)}  # {1: 1, 2: 4, 3: 9}</div>
        <p class="form-hint" style="margin-top: 1rem;">
          <em>Note: This resource is an interactive built-in preview. In a Flask production backend, this action links directly to <code>/api/resources/python-guide.pdf</code>.</em>
        </p>
      `
    },
    javascript: {
      title: '⚡ Modern JavaScript ES6+ Battle Guide',
      content: `
        <div style="background: rgba(6,182,212,0.1); border-left: 3px solid var(--accent-cyan); padding: 0.75rem 1rem; margin-bottom: 1rem; border-radius: 4px;">
          <strong>Quick Concept Review:</strong> Asynchronous flow, Closures, Scoping, and DOM Event Delegation.
        </div>
        <ul style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem;">
          <li>🔹 <strong>const vs let:</strong> <code>const</code> prevents variable reassignment; both are block-scoped.</li>
          <li>🔹 <strong>Async / Await:</strong> Async functions always return a Promise. Handle errors with <code>try...catch</code>.</li>
          <li>🔹 <strong>Closures:</strong> Functions retain references to their outer lexical environment even after parent execution completes.</li>
          <li>🔹 <strong>Event Delegation:</strong> Attach one listener to the container instead of many children.</li>
        </ul>
        <div class="code-snippet mt-1">// JS Quick Recall:\nconst fetchData = async () => (await fetch('/api/data')).json();</div>
        <p class="form-hint" style="margin-top: 1rem;">
          <em>Note: Connects to Flask <code>/api/resources/js-guide.pdf</code> in production.</em>
        </p>
      `
    },
    default: {
      title: '📖 Study Resource Summary',
      content: `
        <p style="margin-bottom: 1rem;">Review essential syntax, patterns, and tips before beginning the timed quiz challenge.</p>
        <ul style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem;">
          <li>🔹 Read questions carefully and watch for subtle negation words like "NOT" or "EXCEPT".</li>
          <li>🔹 Use keyboard or quick touch taps to select options under time pressure.</li>
          <li>🔹 Review your incorrect responses in the Results page to earn streak milestones!</li>
        </ul>
        <p class="form-hint" style="margin-top: 1rem;">
          <em>Ready to connect with SQLite documents table & Flask static asset storage.</em>
        </p>
      `
    }
  };

  const selectedGuide = guides[subjectId] || guides.default;
  document.getElementById('resourceModalTitle').textContent = selectedGuide.title;
  document.getElementById('resourceModalBody').innerHTML = selectedGuide.content;

  const downloadBtn = document.getElementById('resourceSimulateDownloadBtn');
  downloadBtn.onclick = () => {
    playAudio('click');
    showToast(`📄 Sample study sheet for ${subjectId.toUpperCase()} opened! Ready to link real PDF in Flask.`, 'success');
    modal.classList.remove('active');
  };

  modal.classList.add('active');
  playAudio('click');
}

// --------------------------------------------------------------------------
// 8. INITIALIZE SHARED BEHAVIORS ON PAGE LOAD
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderUserHeaderStats();
  setupNavigation();

  // Button click audio feedback
  document.querySelectorAll('.btn, .nav-link, .stat-pill, .filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      playAudio('click');
    });
  });
});
