/**
 * ==========================================================================
 * STUDY BATTLE - Analytics & Achievements Engine (analytics.js)
 * Screen 14: Vanilla JS / SVG Data Visualizations & Badge Milestone Tracking
 * 
 * NOTE FOR FLASK / SQLITE INTEGRATION:
 * The data aggregations below can later be queried directly from SQLite via
 * Flask routes: `/api/analytics/weekly`, `/api/analytics/subjects`, `/api/achievements`
 * ==========================================================================
 */

// --------------------------------------------------------------------------
// 1. ANALYTICS PAGE CONTROLLER (analytics.html)
// --------------------------------------------------------------------------
function initAnalyticsPage() {
  const container = document.getElementById('analyticsDashboard');
  if (!container) return;

  const user = getUser();
  const history = getBattleHistory();

  // 1. Render Summary Cards
  const elTotalBattles = document.getElementById('statTotalBattles');
  const elAvgAccuracy = document.getElementById('statAvgAccuracy');
  const elTotalXp = document.getElementById('statTotalXp');
  const elCurrentStreak = document.getElementById('statCurrentStreak');

  if (elTotalBattles) elTotalBattles.textContent = user.battlesCompleted || history.length || 0;
  if (elAvgAccuracy) elAvgAccuracy.textContent = `${user.accuracy || 82}%`;
  if (elTotalXp) elTotalXp.textContent = (user.xp || 1250).toLocaleString();
  if (elCurrentStreak) elCurrentStreak.textContent = `${user.streak || 3} Days`;

  // 2. Render Weekly Activity Bar Chart (Pure CSS/SVG)
  renderWeeklyChart();

  // 3. Render Subject Accuracy Bars
  renderSubjectAccuracyBars();

  // 4. Render Battle History Table
  renderBattleHistoryTable(history);
}

function renderWeeklyChart() {
  const chartContainer = document.getElementById('weeklyXpChart');
  if (!chartContainer) return;

  // Sample weekly XP distribution: Mon - Sun
  const days = [
    { label: 'Mon', xp: 140 },
    { label: 'Tue', xp: 210 },
    { label: 'Wed', xp: 180 },
    { label: 'Thu', xp: 260 },
    { label: 'Fri', xp: 120 },
    { label: 'Sat', xp: 320 },
    { label: 'Sun', xp: 200 }
  ];

  const maxXp = Math.max(...days.map(d => d.xp));

  chartContainer.innerHTML = days.map(day => {
    const heightPercent = Math.round((day.xp / maxXp) * 100);
    return `
      <div class="chart-bar-group">
        <div class="chart-bar" style="height: ${heightPercent}%;">
          <div class="chart-bar-tooltip">${day.xp} XP</div>
        </div>
        <span class="chart-label">${day.label}</span>
      </div>
    `;
  }).join('');
}

function renderSubjectAccuracyBars() {
  const container = document.getElementById('subjectAccuracyList');
  if (!container) return;

  const subjectStats = [
    { name: 'HTML & CSS', accuracy: 88, icon: '🎨', color: 'var(--success)' },
    { name: 'Python', accuracy: 82, icon: '🐍', color: 'var(--accent-purple)' },
    { name: 'UI/UX Design', accuracy: 78, icon: '📐', color: 'var(--accent-cyan)' },
    { name: 'JavaScript', accuracy: 74, icon: '⚡', color: 'var(--xp-gold)' },
    { name: 'Java', accuracy: 68, icon: '☕', color: '#f97316' },
    { name: 'DBMS & SQL', accuracy: 62, icon: '🗄️', color: '#06b6d4' }
  ];

  container.innerHTML = subjectStats.map(s => `
    <div style="margin-bottom: 1.15rem;">
      <div class="flex-between mb-1" style="font-size: 0.88rem;">
        <span style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-white); font-weight: 600;">
          <span>${s.icon}</span> ${s.name}
        </span>
        <span style="font-weight: 700; color: ${s.color};">${s.accuracy}%</span>
      </div>
      <div class="progress-container">
        <div class="progress-fill" style="width: ${s.accuracy}%; background: ${s.color};"></div>
      </div>
    </div>
  `).join('');
}

function renderBattleHistoryTable(history) {
  const tbody = document.getElementById('battleHistoryTbody');
  if (!tbody) return;

  if (history.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          No battles recorded yet. Start your first battle!
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = history.map(item => `
    <tr>
      <td style="color: var(--text-white); font-weight: 500;">${item.date}</td>
      <td>
        <span class="badge ${item.mode.includes('Random') ? 'badge-gold' : (item.mode.includes('Topic') ? 'badge-cyan' : 'badge-purple')}">
          ${item.mode}
        </span>
      </td>
      <td style="color: var(--text-white); font-weight: 600;">${item.subject}</td>
      <td style="color: var(--text-muted); font-size: 0.82rem;">${item.topic}</td>
      <td>
        <span style="font-weight: 700; color: ${item.accuracy >= 80 ? 'var(--success)' : 'var(--warning)'};">
          ${item.score} (${item.accuracy}%)
        </span>
      </td>
      <td style="color: var(--xp-gold); font-weight: 700;">+${item.xpEarned} XP</td>
    </tr>
  `).join('');
}

// --------------------------------------------------------------------------
// 2. ACHIEVEMENTS PAGE CONTROLLER (achievements.html)
// --------------------------------------------------------------------------
function initAchievementsPage() {
  const grid = document.getElementById('achievementsGrid');
  if (!grid) return;

  const achievements = getAchievements();
  const filterPills = document.querySelectorAll('.achievement-filter-pill');
  let currentFilter = 'all';

  function renderAchievements() {
    const filtered = achievements.filter(ach => {
      if (currentFilter === 'unlocked') return ach.unlocked;
      if (currentFilter === 'in-progress') return !ach.unlocked;
      return true;
    });

    // Unlocked counter summary
    const totalUnlocked = achievements.filter(a => a.unlocked).length;
    const summaryEl = document.getElementById('achievementsSummaryCount');
    if (summaryEl) {
      summaryEl.textContent = `${totalUnlocked} of ${achievements.length} Unlocked (${Math.round((totalUnlocked / achievements.length) * 100)}%)`;
    }

    grid.innerHTML = filtered.map(ach => {
      const isUnlocked = ach.unlocked;
      const progressPercent = Math.min(100, Math.round((ach.progress / ach.target) * 100));

      return `
        <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="achievement-top">
            <div class="achievement-icon">${ach.icon}</div>
            <div class="achievement-info" style="flex: 1;">
              <h4>${ach.title}</h4>
              <p>${ach.description}</p>
            </div>
          </div>

          <div class="flex-between mb-1" style="font-size: 0.78rem;">
            <span style="color: var(--text-muted);">
              ${isUnlocked ? '✅ Completed' : `Milestone: ${ach.progress} / ${ach.target}`}
            </span>
            <span class="badge ${isUnlocked ? 'badge-gold' : 'badge-purple'}">
              +${ach.xpReward} XP
            </span>
          </div>

          <div class="progress-container">
            <div class="progress-fill ${isUnlocked ? 'progress-fill-gold' : ''}" style="width: ${progressPercent}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      playAudio('click');
      renderAchievements();
    });
  });

  renderAchievements();
}

// --------------------------------------------------------------------------
// INITIALIZE ON LOAD
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('analyticsDashboard')) {
    initAnalyticsPage();
  }
  if (document.getElementById('achievementsGrid')) {
    initAchievementsPage();
  }
});
