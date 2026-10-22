# Study Battle – Gamified Learning Platform

> **"Your Learning. Your Rules. Your Battle."**  
> A complete, modern, responsive gamified education web platform built with **Vanilla HTML5, CSS3, and JavaScript**. Zero frameworks, zero external dependencies.

---

## 🌟 Overview & Key Highlights

Study Battle transforms technical and programming curriculum into an addictive gaming adventure. Students choose between three battle formats, solve timed multiple-choice challenges, earn XP bounties, level up through gladiator ranks, maintain daily streaks, and review their mistakes with rule-based study advice.

### ✨ What's Inside:
- **15 Complete Interactive Screens**:
  1. `index.html` — **Welcome Page**: Logo, hero headline, live interactive question preview, stats ticker, and feature showcase.
  2. `experience.html` — **Gamified Learning Experience**: Explains XP, ranks, streaks, missions, and includes an interactive gamification sandbox.
  3. `ai-learning.html` — **Learn Smarter with AI**: Interactive study advisor with sample student profiles (Alex, Sam, Jordan) diagnosing weak concepts and offering rule-based recommendations.
  4. `dashboard.html` — **Gladiator Dashboard**: Daily streak flame, XP progress, level progress bar, "Continue Learning" action card, battle arena launcher, and daily quests.
  5. `login.html` — **Login**: Form validation, password visibility toggle, remember me checkbox, and a 1-click demo credential filler.
  6. `signup.html` — **Signup / Account Creation**: Live password-match indicator, validation, and session creator.
  7. `study-home.html` — **Learning Home & Battle Hub**: Deep breakdown of Topic Battle, Subject Battle, and Random Battle with career statistics.
  8. `subjects.html` — **Subjects & Programming Languages**: Dynamic cards for Python, JavaScript, Java, HTML/CSS, UI/UX Design, and DBMS with search and category filters.
  9. `battle-modes.html` — **Battle Mode Selection**: Comparison of combat formats and interactive pre-battle study cheat-sheet guides (no broken links!).
  10. `topic-battle.html` — **Topic Battle**: Choose 1 subject and 1 micro-topic (e.g. Python List Comprehensions) for a focused 5-question battle.
  11. `subject-battle.html` — **Subject Battle**: Comprehensive test of an entire language curriculum with difficulty ratings.
  12. `random-battle.html` — **Chaos Arena (Random Battle)**: Cross-disciplinary mixed pool drawing questions across all subjects with an active **1.25x XP Multiplier**.
  13. `quiz.html` — **Shared Battle Engine**: Single question display, countdown timer with low-time warning, multiple-choice selection, validation, and progress bar.
  14. `results.html` — **Battle Results & Review**: Final score, accuracy percentage, XP yield, question-by-question review with explanations, and rule-based study suggestions.
  15. `analytics.html` — **Analytics**: Weekly XP bar chart, subject accuracy breakdown, and persisted battle history log.
  16. `achievements.html` — **Achievements & Badges**: 12 unlockable trophies with milestone progress bars and XP rewards.
  17. `profile.html` — **Profile & Settings**: Editable student gamer tag, statistics, and functional toggles for theme (Premium Navy vs OLED High Contrast), sound effects, reminders, and timer modes.

---

## 🎨 Design & Aesthetic System

- **Color Theme**: Deep space navy (`#0B1021`, `#121933`), electric violet/purple (`#8B5CF6`), cyber cyan (`#06B6D4`), streak fire (`#EF4444`), and gamification gold (`#F59E0B`).
- **Typography**: Clean hierarchy with Google Fonts (Poppins & Inter fallback).
- **Audio Effects**: Built-in **Web Audio API** procedural sound synthesizer (click sounds, correct chime, wrong buzz, fanfare victory, and level-up chords). **Requires 0 external MP3 files!**
- **Micro-Animations**: Shimmering progress bars, hover lifts, pulse glows, and smooth modal overlays.
- **Responsiveness**: Fully responsive layouts across desktop, laptop, tablet, and mobile screens with off-canvas sidebar drawer.

---

## 🚀 How to Run in VS Code

### Option 1: Using VS Code Live Server (Recommended)
1. Open Visual Studio Code.
2. Select **File > Open Folder...** and choose `C:\Users\anith\OneDrive\Desktop\Study Battle`.
3. If you haven't already, install the **Live Server** extension (by *Ritwick Dey*) from the VS Code Extensions marketplace (`Ctrl+Shift+X`).
4. Right-click on `index.html` in the Explorer sidebar and click **"Open with Live Server"**.
5. Your browser will automatically open at `http://127.0.0.1:5500/index.html`.

### Option 2: Using Python's Built-in HTTP Server
1. Open PowerShell or Command Prompt inside this folder:
   ```powershell
   cd "C:\Users\anith\OneDrive\Desktop\Study Battle"
   python -m http.server 8000
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:8000/index.html
   ```

### Option 3: Direct Browser Launch
- You can simply double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari. All styles, icons, and JavaScript scripts will load seamlessly.

---

## 📁 Project Folder Structure

```
Study Battle/
│
├── index.html            # Screen 1: Welcome Page & Hero Battle Preview
├── experience.html       # Screen 2: Gamified Learning Experience & Sandbox
├── ai-learning.html      # Screen 3: Learn Smarter with AI / Study Advisor
├── dashboard.html        # Screen 4: Gladiator Dashboard & Quests
├── login.html            # Screen 5: Login with Demo Fill & Validation
├── signup.html           # Screen 6: Create Account & Password Matcher
├── study-home.html       # Screen 7: Learning Home & Combat Hub
├── subjects.html         # Screen 8: Subjects & Languages (Extensible)
├── battle-modes.html     # Screen 9: Battle Mode Selection & Study Guides
├── topic-battle.html     # Screen 10: Topic Battle Configuration
├── subject-battle.html   # Screen 11: Subject Battle Curriculum Launcher
├── random-battle.html    # Screen 12: Random Battle (1.25x Multiplier)
├── quiz.html             # Screen 13: Shared Interactive Quiz Engine
├── results.html          # Screen 13: Results, Explanations & Study Advice
├── analytics.html        # Screen 14: Learning Analytics & SVG Charts
├── achievements.html     # Screen 14: 12 Badges & Milestone Meters
├── profile.html          # Screen 15: Student Profile & Settings Toggles
│
├── css/
│   ├── style.css         # Theme variables, layouts, buttons, cards, modals
│   └── responsive.css    # Breakpoints for tablets, mobile, and drawer
│
├── js/
│   ├── data.js           # Subjects, Question Bank, Achievements, Recommendations
│   ├── app.js            # State manager, Web Audio SFX, Toasts, Modals, Stats sync
│   ├── auth.js           # Auth guard, demo login/signup, password toggles
│   ├── subjects.js       # Dynamic subject cards, category filters, live search
│   ├── quiz.js           # Shared quiz engine, countdown timer, scoring, review
│   ├── analytics.js      # SVG chart rendering, history table, badge progress
│   └── settings.js       # Profile name editor, preference switches, data reset
│
└── assets/
    └── images/           # Asset container for future custom graphic files
```

---

## 🔌 Python Flask & SQLite Integration Guide

This frontend is cleanly decoupled and explicitly commented with instructions on how to transition from demo `localStorage` to real backend API endpoints.

### Step 1: Suggested SQLite Database Schema
```sql
-- Users Table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    level INTEGER DEFAULT 1,
    level_title TEXT DEFAULT 'Novice Fighter',
    xp INTEGER DEFAULT 150,
    streak INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects Table
CREATE TABLE subjects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    icon TEXT,
    difficulty TEXT,
    description TEXT
);

-- Questions Table
CREATE TABLE questions (
    id TEXT PRIMARY KEY,
    subject_id TEXT,
    topic TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    question TEXT NOT NULL,
    code_snippet TEXT,
    options_json TEXT NOT NULL, -- JSON array of 4 options
    correct_index INTEGER NOT NULL,
    explanation TEXT NOT NULL,
    FOREIGN KEY(subject_id) REFERENCES subjects(id)
);

-- Battles History Table
CREATE TABLE battles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    mode TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT,
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    accuracy INTEGER NOT NULL,
    xp_earned INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
```

### Step 2: Suggested Flask Endpoints (`app.py`)
```python
from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__, static_folder='.', static_url_path='', template_folder='.')

# 1. Authentication
@app.route('/api/auth/login', methods=['POST'])
def api_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    # Validate against users table in SQLite...
    return jsonify({"success": True, "token": "session_jwt_here", "name": "Alex Hunter"})

# 2. Get Subjects
@app.route('/api/subjects', methods=['GET'])
def api_subjects():
    # Fetch from SQLite subjects table
    return jsonify(DATA_SUBJECTS)

# 3. Get Questions for Quiz
@app.route('/api/quiz/questions', methods=['GET'])
def api_quiz_questions():
    mode = request.args.get('mode') # 'topic', 'subject', 'random'
    subject = request.args.get('subject')
    topic = request.args.get('topic')
    # Query SQLite questions with LIMIT 5 or 6...
    return jsonify(selected_questions)

# 4. Submit Quiz Battle & Record XP
@app.route('/api/quiz/submit', methods=['POST'])
def api_quiz_submit():
    payload = request.json
    # Calculate score, insert into battles table, increment user XP & streak...
    return jsonify({"status": "recorded", "xpEarned": payload['xpEarned']})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

### Step 3: Connecting JavaScript to Flask
In `js/app.js`, `js/auth.js`, and `js/quiz.js`, look for the comments marked:
```javascript
// FLASK INTEGRATION: Replace localStorage with fetch('/api/...')
```
Replace the respective `localStorage.getItem` and `localStorage.setItem` blocks with simple `fetch()` promises!

---

## 🛡️ Best Practices & Quality Standards Met
- **Semantic HTML5**: Native tags (`<header>`, `<aside>`, `<main>`, `<section>`, `<nav>`, `<footer>`).
- **Accessible & High-Contrast**: Tested contrast ratios matching WCAG 2.1 AA standards.
- **Zero Framework Bloat**: No React, no Vue, no jQuery, no Bootstrap. Pure browser-native standard APIs.
- **Offline Capable**: Audio uses browser Web Audio API; all assets run seamlessly without active internet.
