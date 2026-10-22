/**
 * ==========================================================================
 * STUDY BATTLE - Subjects & Languages Module (subjects.js)
 * Screen 8: Dynamic subject listing, category filtering, search & topic preview
 * ==========================================================================
 */

function initSubjectsPage() {
  const gridContainer = document.getElementById('subjectsGrid');
  if (!gridContainer) return;

  const searchInput = document.getElementById('subjectSearchInput');
  const filterPills = document.querySelectorAll('.filter-pill');

  let currentCategory = 'all';
  let searchQuery = '';

  /**
   * Renders the subject cards dynamically from DATA_SUBJECTS
   */
  function renderCards() {
    const filtered = DATA_SUBJECTS.filter(subject => {
      const matchesCategory = currentCategory === 'all' || subject.category === currentCategory;
      const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            subject.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            subject.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <h3 style="color: var(--text-white); margin-bottom: 0.35rem;">No subjects found</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">Try adjusting your search terms or category filter.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered.map(subject => {
      const difficultyBadgeClass = subject.difficulty.includes('Beginner') ? 'badge-green' : 'badge-purple';
      const topicsListHtml = subject.topics.map(t => `<li>• ${t}</li>`).join('');

      return `
        <div class="subject-card" data-subject-id="${subject.id}">
          <div class="subject-card-top">
            <div class="subject-icon-box">${subject.icon}</div>
            <span class="badge ${difficultyBadgeClass}">${subject.difficulty}</span>
          </div>

          <h3>${subject.name}</h3>
          <p>${subject.description}</p>

          <div style="background: var(--bg-darkest); padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 1.25rem;">
            <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600; margin-bottom: 0.35rem;">
              Core Syllabus Topics (${subject.topicsCount})
            </div>
            <ul style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
              ${topicsListHtml}
            </ul>
          </div>

          <div class="subject-stats-row">
            <span>Subject Mastery</span>
            <span style="font-weight: 600; color: var(--text-white);">${subject.progress}%</span>
          </div>

          <div class="progress-container mb-2">
            <div class="progress-fill" style="width: ${subject.progress}%;"></div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: auto;">
            <a href="quiz.html?mode=subject&subject=${subject.id}" class="btn btn-primary btn-sm" style="font-size: 0.82rem;">
              ⚔️ Battle
            </a>
            <a href="topic-battle.html?subject=${subject.id}" class="btn btn-secondary btn-sm" style="font-size: 0.82rem;">
              🎯 Topics
            </a>
          </div>

          <div style="margin-top: 0.65rem; text-align: center;">
            <button class="open-resource-btn" data-subject="${subject.id}" style="color: var(--accent-cyan); font-size: 0.78rem; text-decoration: underline; background: none; border: none; cursor: pointer;">
              📖 Open Study Guide & Notes
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach study guide modal triggers
    gridContainer.querySelectorAll('.open-resource-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-subject');
        openStudyResourceModal(sid);
      });
    });
  }

  // Filter Pills Event Handling
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      playAudio('click');
      renderCards();
    });
  });

  // Search Input Event Handling
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderCards();
    });
  }

  // Initial render
  renderCards();
}

document.addEventListener('DOMContentLoaded', () => {
  initSubjectsPage();
});
