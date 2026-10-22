/**
 * ==========================================================================
 * STUDY BATTLE - Authentication & Session Handler (auth.js)
 * Manages Login, Registration, Password Visibility, Validation & Logout
 * 
 * NOTE FOR FLASK / SQLITE INTEGRATION:
 * The demo authentication functions below contain comments showing the exact
 * fetch() calls and Flask routes to replace frontend mock validation.
 * ==========================================================================
 */

const AUTH_TOKEN_KEY = 'sb_auth_session';

/**
 * Checks if the user is currently authenticated in the frontend demo
 */
function isAuthenticated() {
  return localStorage.getItem(AUTH_TOKEN_KEY) !== null;
}

/**
 * Route guard: Redirects to login.html if user is not authenticated
 */
function requireAuth() {
  if (!isAuthenticated()) {
    // For smooth demo experience, if user hasn't explicitly logged in,
    // we can either redirect to login or initialize a guest demo session.
    // In this app, we initialize the demo session for convenience so direct links work!
    initDemoSession();
  }
}

/**
 * Sets demo session token
 */
function initDemoSession(userEmail = 'alex.hunter@studybattle.dev') {
  localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify({
    authenticated: true,
    email: userEmail,
    loginTimestamp: new Date().toISOString()
  }));
}

/**
 * Logs out user, clears session, and redirects to login
 * FLASK INTEGRATION: `await fetch('/api/auth/logout', { method: 'POST' });`
 */
function logoutUser() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  showToast('Logged out successfully. See you in the Arena!', 'info');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 600);
}

// --------------------------------------------------------------------------
// PASSWORD TOGGLE HELPER
// --------------------------------------------------------------------------
function setupPasswordToggles() {
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetInputId = btn.getAttribute('data-target');
      const input = document.getElementById(targetInputId);
      if (!input) return;

      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');

      // Update icon SVG
      btn.innerHTML = isPassword
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
             <line x1="1" y1="1" x2="23" y2="23"></line>
           </svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
             <circle cx="12" cy="12" r="3"></circle>
           </svg>`;
    });
  });
}

// --------------------------------------------------------------------------
// LOGIN FORM HANDLER (Screen 5)
// --------------------------------------------------------------------------
function setupLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const errorContainer = document.getElementById('loginError');
  const demoFillBtn = document.getElementById('demoFillBtn');
  const forgotPwBtn = document.getElementById('forgotPasswordLink');

  // Fill sample demo credentials button
  if (demoFillBtn) {
    demoFillBtn.addEventListener('click', (e) => {
      e.preventDefault();
      emailInput.value = 'alex.hunter@studybattle.dev';
      passwordInput.value = 'battle123';
      showToast('⚡ Sample credentials filled!', 'info', 2000);
      playAudio('click');
    });
  }

  // Forgot Password trigger
  if (forgotPwBtn) {
    forgotPwBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('🔑 Demo Mode: Password reset link simulated. Check console or use demo credentials!', 'info', 4000);
      playAudio('click');
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validation
    if (!email || !email.includes('@')) {
      showError(errorContainer, 'Please enter a valid email address.');
      emailInput.focus();
      playAudio('wrong');
      return;
    }

    if (!password || password.length < 4) {
      showError(errorContainer, 'Password must be at least 4 characters long.');
      passwordInput.focus();
      playAudio('wrong');
      return;
    }

    // Success (FLASK INTEGRATION: fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }))
    hideError(errorContainer);
    initDemoSession(email);
    playAudio('correct');
    showToast('⚔️ Welcome back to Study Battle! Loading Arena...', 'success', 1500);

    // Save/update user session
    const user = getUser();
    user.email = email;
    saveUser(user);

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 800);
  });
}

// --------------------------------------------------------------------------
// SIGNUP FORM HANDLER (Screen 6)
// --------------------------------------------------------------------------
function setupSignupForm() {
  const form = document.getElementById('signupForm');
  if (!form) return;

  const nameInput = document.getElementById('signupName');
  const emailInput = document.getElementById('signupEmail');
  const passwordInput = document.getElementById('signupPassword');
  const confirmPasswordInput = document.getElementById('signupConfirmPassword');
  const errorContainer = document.getElementById('signupError');
  const matchIndicator = document.getElementById('passwordMatchIndicator');

  // Live Password Match Check
  if (confirmPasswordInput && passwordInput && matchIndicator) {
    const checkMatch = () => {
      if (!confirmPasswordInput.value) {
        matchIndicator.textContent = '';
        return;
      }
      if (confirmPasswordInput.value === passwordInput.value) {
        matchIndicator.textContent = '✅ Passwords match';
        matchIndicator.style.color = 'var(--success)';
      } else {
        matchIndicator.textContent = '❌ Passwords do not match';
        matchIndicator.style.color = 'var(--danger)';
      }
    };
    passwordInput.addEventListener('input', checkMatch);
    confirmPasswordInput.addEventListener('input', checkMatch);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validation
    if (!name || name.length < 2) {
      showError(errorContainer, 'Please enter your full name or gamer tag.');
      nameInput.focus();
      playAudio('wrong');
      return;
    }

    if (!email || !email.includes('@')) {
      showError(errorContainer, 'Please enter a valid email address.');
      emailInput.focus();
      playAudio('wrong');
      return;
    }

    if (!password || password.length < 6) {
      showError(errorContainer, 'Password must be at least 6 characters long.');
      passwordInput.focus();
      playAudio('wrong');
      return;
    }

    if (password !== confirmPassword) {
      showError(errorContainer, 'Passwords do not match. Please re-check.');
      confirmPasswordInput.focus();
      playAudio('wrong');
      return;
    }

    // Success (FLASK INTEGRATION: fetch('/api/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) }))
    hideError(errorContainer);
    initDemoSession(email);

    // Create fresh user profile with chosen name
    const newUser = {
      ...DEFAULT_USER,
      name: name,
      email: email,
      level: 1,
      levelTitle: 'Novice Fighter',
      xp: 150,
      xpCurrentLevel: 150,
      xpRequiredLevel: 250,
      streak: 1,
      battlesCompleted: 0,
      accuracy: 100,
      dailyEarnedXp: 50
    };
    saveUser(newUser);

    playAudio('correct');
    showToast(`🎉 Welcome to the Arena, ${name}! Your gladiator journey begins.`, 'success', 2000);

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  });
}

function showError(container, msg) {
  if (!container) return;
  container.textContent = msg;
  container.classList.add('visible');
}

function hideError(container) {
  if (!container) return;
  container.textContent = '';
  container.classList.remove('visible');
}

// --------------------------------------------------------------------------
// LOGOUT CONFIRMATION MODAL HELPER
// --------------------------------------------------------------------------
function setupLogoutModal() {
  const logoutBtns = document.querySelectorAll('.action-logout');
  if (logoutBtns.length === 0) return;

  // Ensure modal markup exists
  let modal = document.getElementById('logoutConfirmModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'logoutConfirmModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box" style="max-width: 440px;">
        <div class="modal-header">
          <div class="modal-title">⚔️ Leave Study Battle Arena?</div>
          <span class="modal-close-btn" data-close-modal="logoutConfirmModal">&times;</span>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to log out? Your progress, XP, and streak are safely stored in your local session.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-close-modal="logoutConfirmModal">Cancel</button>
          <button class="btn btn-danger" id="confirmLogoutSubmitBtn">Log Out</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('[data-close-modal="logoutConfirmModal"]').addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.querySelector('.btn-secondary').addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.querySelector('#confirmLogoutSubmitBtn').addEventListener('click', () => {
      logoutUser();
    });
  }

  logoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      playAudio('click');
    });
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  setupPasswordToggles();
  setupLoginForm();
  setupSignupForm();
  setupLogoutModal();
});
