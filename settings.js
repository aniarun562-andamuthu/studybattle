/**
 * ==========================================================================
 * STUDY BATTLE - Profile & Settings Engine (settings.js)
 * Screen 15: Profile editing, preference toggles & local data management
 * ==========================================================================
 */

function initProfilePage() {
  const profileCard = document.getElementById('profileContainer');
  if (!profileCard) return;

  const user = getUser();

  // Elements
  const elName = document.getElementById('profileNameDisplay');
  const elEmail = document.getElementById('profileEmailDisplay');
  const elLevelTitle = document.getElementById('profileLevelTitleDisplay');
  const elXp = document.getElementById('profileXpDisplay');
  const elStreak = document.getElementById('profileStreakDisplay');
  const elBattles = document.getElementById('profileBattlesDisplay');
  const elAccuracy = document.getElementById('profileAccuracyDisplay');

  // Input Toggles
  const toggleTheme = document.getElementById('settingToggleTheme');
  const toggleSound = document.getElementById('settingToggleSound');
  const toggleNotifications = document.getElementById('settingToggleNotifications');
  const toggleTimer = document.getElementById('settingToggleTimer');

  // Populate Profile Information
  if (elName) elName.textContent = user.name || 'Alex Hunter';
  if (elEmail) elEmail.textContent = user.email || 'alex.hunter@studybattle.dev';
  if (elLevelTitle) elLevelTitle.textContent = `Level ${user.level || 1} • ${user.levelTitle || 'Code Gladiator'}`;
  if (elXp) elXp.textContent = (user.xp || 1250).toLocaleString();
  if (elStreak) elStreak.textContent = `${user.streak || 3} Days`;
  if (elBattles) elBattles.textContent = user.battlesCompleted || 18;
  if (elAccuracy) elAccuracy.textContent = `${user.accuracy || 82}%`;

  // Set Initial Toggle States from user.settings
  const settings = user.settings || {};

  if (toggleTheme) {
    toggleTheme.checked = settings.theme === 'high-contrast';
    toggleTheme.addEventListener('change', () => {
      user.settings = user.settings || {};
      user.settings.theme = toggleTheme.checked ? 'high-contrast' : 'default';
      saveUser(user);
      playAudio('click');
      showToast(toggleTheme.checked ? '🎨 High Contrast OLED theme active' : '🎨 Premium Navy theme active', 'info');
    });
  }

  if (toggleSound) {
    toggleSound.checked = settings.soundEnabled !== false;
    toggleSound.addEventListener('change', () => {
      user.settings = user.settings || {};
      user.settings.soundEnabled = toggleSound.checked;
      saveUser(user);
      playAudio('click');
      showToast(toggleSound.checked ? '🔊 Audio effects enabled' : '🔇 Audio effects muted', 'info');
    });
  }

  if (toggleNotifications) {
    toggleNotifications.checked = settings.notificationsEnabled !== false;
    toggleNotifications.addEventListener('change', () => {
      user.settings = user.settings || {};
      user.settings.notificationsEnabled = toggleNotifications.checked;
      saveUser(user);
      playAudio('click');
      showToast(toggleNotifications.checked ? '🔔 Daily streak reminders active' : '🔕 Reminders paused', 'info');
    });
  }

  if (toggleTimer) {
    toggleTimer.checked = settings.timerMode === 'relaxed';
    toggleTimer.addEventListener('change', () => {
      user.settings = user.settings || {};
      user.settings.timerMode = toggleTimer.checked ? 'relaxed' : 'strict';
      saveUser(user);
      playAudio('click');
      showToast(toggleTimer.checked ? '⏱️ Relaxed Timer Mode (40s per question)' : '⚡ Strict Timer Mode (20s per question)', 'info');
    });
  }

  // Edit Display Name Action
  const editNameBtn = document.getElementById('editProfileNameBtn');
  if (editNameBtn) {
    editNameBtn.addEventListener('click', () => {
      const currentName = user.name || 'Alex Hunter';
      const newName = prompt('Enter your new Gladiator Gamer Tag / Name:', currentName);
      if (newName && newName.trim().length > 1) {
        user.name = newName.trim();
        saveUser(user);
        if (elName) elName.textContent = user.name;
        showToast(`✅ Profile name updated to "${user.name}"!`, 'success');
        playAudio('correct');
      }
    });
  }

  // Reset Demo Data Handler
  const resetBtn = document.getElementById('resetDemoDataBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all demo battle history, XP, and profile stats back to starter state?')) {
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.HISTORY);
        localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
        localStorage.removeItem('sb_last_battle_result');

        showToast('🔄 Demo data reset to fresh defaults.', 'info');
        playAudio('click');
        setTimeout(() => {
          window.location.reload();
        }, 600);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initProfilePage();
});
