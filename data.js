/**
 * ==========================================================================
 * STUDY BATTLE - Centralized Mock Data & Curricula
 * Reusable data structure ready to integrate with SQLite & Flask API
 * ==========================================================================
 */

// Available Subjects & Programming Languages
const DATA_SUBJECTS = [
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    icon: '🐍',
    difficulty: 'Beginner to Intermediate',
    topicsCount: 4,
    questionsCount: 6,
    progress: 75,
    description: 'Master Python syntax, data structures, list comprehensions, OOP principles, and clean scripting.',
    topics: [
      'Variables & Data Types',
      'Functions & Scope',
      'List Comprehensions',
      'OOP Basics & Classes'
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'languages',
    icon: '⚡',
    difficulty: 'Intermediate',
    topicsCount: 4,
    questionsCount: 6,
    progress: 60,
    description: 'Modern ES6+, closures, asynchronous JavaScript (Promises & Async/Await), and DOM interactions.',
    topics: [
      'ES6 Syntax & Scopes',
      'Async/Await & Promises',
      'Closures & Higher Order Functions',
      'DOM Manipulation & Events'
    ]
  },
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    icon: '☕',
    difficulty: 'Intermediate',
    topicsCount: 3,
    questionsCount: 4,
    progress: 45,
    description: 'Object-Oriented Programming, Java collections, inheritance, interfaces, and exception handling.',
    topics: [
      'Classes & Encapsulation',
      'Collections Framework',
      'Exceptions & Memory Management'
    ]
  },
  {
    id: 'html-css',
    name: 'HTML & CSS',
    category: 'web',
    icon: '🎨',
    difficulty: 'Beginner',
    topicsCount: 3,
    questionsCount: 4,
    progress: 85,
    description: 'Semantic HTML5 structures, modern CSS Flexbox, Grid systems, responsive styling, and CSS variables.',
    topics: [
      'Semantic HTML5 Tags',
      'Flexbox & CSS Grid',
      'Box Model & CSS Variables'
    ]
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    category: 'web',
    icon: '📐',
    difficulty: 'Beginner',
    topicsCount: 3,
    questionsCount: 4,
    progress: 50,
    description: 'User-centered design principles, visual hierarchy, color theory, accessibility (WCAG), and usability heuristics.',
    topics: [
      'Visual Hierarchy & Typography',
      'Nielsen Norman Usability Heuristics',
      'Color Contrast & Accessibility (WCAG)'
    ]
  },
  {
    id: 'dbms',
    name: 'DBMS & SQL',
    category: 'database',
    icon: '🗄️',
    difficulty: 'Intermediate',
    topicsCount: 3,
    questionsCount: 4,
    progress: 40,
    description: 'Relational database architecture, SQL queries, JOINs, ACID transactions, and normalization forms.',
    topics: [
      'SQL Queries & Table JOINs',
      'ACID Properties & Transactions',
      'Database Normalization (1NF, 2NF, 3NF)'
    ]
  }
];

// Comprehensive Question Bank
const DATA_QUESTIONS = [
  // --- PYTHON QUESTIONS ---
  {
    id: 'py-1',
    subjectId: 'python',
    topic: 'Variables & Data Types',
    difficulty: 'Beginner',
    question: 'Which of the following data types in Python is immutable?',
    code: `# Example:\nx = (1, 2, 3)\nx[0] = 5  # Raises TypeError!`,
    options: ['List', 'Dictionary', 'Tuple', 'Set'],
    correctIndex: 2,
    explanation: 'Tuples in Python are immutable sequences. Once created, their items cannot be modified, added, or removed.'
  },
  {
    id: 'py-2',
    subjectId: 'python',
    topic: 'Functions & Scope',
    difficulty: 'Beginner',
    question: 'What is the purpose of the *args parameter in a Python function definition?',
    code: `def calculate_total(*args):\n    return sum(args)`,
    options: [
      'Forces arguments to be passed as keyword arguments',
      'Allows passing a variable number of positional arguments as a tuple',
      'Multiplies every argument by a constant pointer',
      'Creates a global reference for the arguments'
    ],
    correctIndex: 1,
    explanation: '*args allows a function to accept any number of positional arguments, which are packed into a tuple inside the function.'
  },
  {
    id: 'py-3',
    subjectId: 'python',
    topic: 'List Comprehensions',
    difficulty: 'Intermediate',
    question: 'What will be the output of the following list comprehension?',
    code: `numbers = [x * 2 for x in range(5) if x % 2 == 0]\nprint(numbers)`,
    options: ['[0, 2, 4]', '[0, 4, 8]', '[2, 4, 6]', '[0, 2, 4, 6, 8]'],
    correctIndex: 1,
    explanation: 'range(5) yields 0, 1, 2, 3, 4. The condition "if x % 2 == 0" filters for 0, 2, 4. Multiplying each by 2 gives [0, 4, 8].'
  },
  {
    id: 'py-4',
    subjectId: 'python',
    topic: 'OOP Basics & Classes',
    difficulty: 'Intermediate',
    question: 'In Python class definitions, what does the __init__ method signify?',
    code: `class Hero:\n    def __init__(self, name, level):\n        self.name = name\n        self.level = level`,
    options: [
      'The class destructor called upon garbage collection',
      'The constructor method invoked automatically when a new instance is created',
      'A method used only for private variable inheritance',
      'A static method to count total active instances'
    ],
    correctIndex: 1,
    explanation: '__init__ is the initializer / constructor in Python, executed automatically when an object is instantiated.'
  },
  {
    id: 'py-5',
    subjectId: 'python',
    topic: 'Functions & Scope',
    difficulty: 'Intermediate',
    question: 'What keyword allows you to modify a variable outside the local function scope in Python?',
    code: `counter = 0\ndef increment():\n    global counter\n    counter += 1`,
    options: ['outer', 'nonlocal', 'global', 'extern'],
    correctIndex: 2,
    explanation: 'The "global" keyword allows a function to bind and modify a module-level variable from within a local scope.'
  },
  {
    id: 'py-6',
    subjectId: 'python',
    topic: 'List Comprehensions',
    difficulty: 'Intermediate',
    question: 'Which syntax creates a dictionary comprehension mapping numbers 1 to 3 to their squares?',
    code: `# Expected output: {1: 1, 2: 4, 3: 9}`,
    options: [
      '{x: x**2 for x in range(1, 4)}',
      'dict(x -> x**2 for x in range(3))',
      '[x: x**2 for x in range(1, 4)]',
      '{x**2 : x for x in (1, 2, 3)}'
    ],
    correctIndex: 0,
    explanation: '{key: value for item in iterable} is the standard Python dictionary comprehension syntax.'
  },

  // --- JAVASCRIPT QUESTIONS ---
  {
    id: 'js-1',
    subjectId: 'javascript',
    topic: 'ES6 Syntax & Scopes',
    difficulty: 'Beginner',
    question: 'What is the key difference between let and const in JavaScript?',
    code: `const maxScore = 100;\nlet currentScore = 40;`,
    options: [
      'let has function scope, while const has block scope',
      'const cannot be reassigned after declaration, whereas let can be reassigned',
      'const variables are hoisted to the top, while let variables are not',
      'let values are immutable primitives only'
    ],
    correctIndex: 1,
    explanation: 'const declarations create block-scoped variables that cannot be reassigned. Variables declared with let can be reassigned.'
  },
  {
    id: 'js-2',
    subjectId: 'javascript',
    topic: 'Async/Await & Promises',
    difficulty: 'Intermediate',
    question: 'What does a JavaScript async function always return?',
    code: `async function fetchStats() {\n    return { xp: 1250, streak: 3 };\n}`,
    options: [
      'The raw evaluated object or primitive directly',
      'A Promise resolving with the return value',
      'A Callback function with an error-first signature',
      'An observable event stream'
    ],
    correctIndex: 1,
    explanation: 'An async function always wraps its return value in a Promise. Even if you return a plain value, it resolves as Promise.resolve(value).'
  },
  {
    id: 'js-3',
    subjectId: 'javascript',
    topic: 'Closures & Higher Order Functions',
    difficulty: 'Intermediate',
    question: 'What is a Closure in JavaScript?',
    code: `function makeAdder(x) {\n    return function(y) {\n        return x + y;\n    };\n}`,
    options: [
      'A method used to immediately terminate an event listener',
      'A function bundled together with references to its surrounding lexical environment',
      'A design pattern to emulate private database transactions in Node.js',
      'A syntax error caused by unclosed curly braces'
    ],
    correctIndex: 1,
    explanation: 'A closure gives an inner function access to its outer scope variables even after the outer function has finished executing.'
  },
  {
    id: 'js-4',
    subjectId: 'javascript',
    topic: 'DOM Manipulation & Events',
    difficulty: 'Beginner',
    question: 'Which method efficiently attaches a single listener to handle events on multiple child elements?',
    code: `document.getElementById("battleGrid")\n  .addEventListener("click", handleBattleClick);`,
    options: [
      'Event Throttling',
      'Event Delegation',
      'Event Multiplexing',
      'DOM Mutation Observer'
    ],
    correctIndex: 1,
    explanation: 'Event Delegation leverages event bubbling to listen for events on a parent element rather than attaching listeners to each child element.'
  },
  {
    id: 'js-5',
    subjectId: 'javascript',
    topic: 'ES6 Syntax & Scopes',
    difficulty: 'Intermediate',
    question: 'What does the spread operator (...) do when applied to an array?',
    code: `const arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4];`,
    options: [
      'Creates a 2D matrix from the elements',
      'Expands the array elements in place into individual arguments or elements',
      'Reverses the elements and sorts them ascendingly',
      'Converts the array into a JSON string'
    ],
    correctIndex: 1,
    explanation: 'The spread operator (...) expands an iterable array into its individual elements, commonly used for shallow copying or concatenation.'
  },
  {
    id: 'js-6',
    subjectId: 'javascript',
    topic: 'Async/Await & Promises',
    difficulty: 'Intermediate',
    question: 'Which Promise method waits until ALL provided promises have resolved or any has rejected?',
    code: `Promise.all([fetchUsers(), fetchScores()]);`,
    options: ['Promise.race', 'Promise.any', 'Promise.all', 'Promise.allSettled'],
    correctIndex: 2,
    explanation: 'Promise.all takes an array of promises and resolves when all resolve, or rejects immediately when the first promise rejects.'
  },

  // --- JAVA QUESTIONS ---
  {
    id: 'java-1',
    subjectId: 'java',
    topic: 'Classes & Encapsulation',
    difficulty: 'Beginner',
    question: 'Which OOP principle is implemented by declaring class attributes as private with public getters and setters?',
    code: `public class Player {\n    private int health;\n    public int getHealth() { return health; }\n}`,
    options: ['Polymorphism', 'Encapsulation', 'Abstraction', 'Inheritance'],
    correctIndex: 1,
    explanation: 'Encapsulation is the bundling of data and the methods that act on that data, restricting direct access to object components.'
  },
  {
    id: 'java-2',
    subjectId: 'java',
    topic: 'Collections Framework',
    difficulty: 'Intermediate',
    question: 'Which Java Collection guarantees unique elements and maintains no duplicate entries?',
    code: `Set<String> subjects = new HashSet<>();`,
    options: ['ArrayList', 'HashMap', 'HashSet', 'LinkedList'],
    correctIndex: 2,
    explanation: 'Set implementations such as HashSet guarantee uniqueness and cannot contain duplicate elements.'
  },
  {
    id: 'java-3',
    subjectId: 'java',
    topic: 'Exceptions & Memory Management',
    difficulty: 'Intermediate',
    question: 'What is the purpose of the finally block in a Java try-catch statement?',
    code: `try {\n    file.open();\n} catch(Exception e) {\n} finally {\n    file.close();\n}`,
    options: [
      'Executes only if an uncaught exception occurred in the catch block',
      'Always executes regardless of whether an exception was thrown or handled',
      'Rolls back memory allocations if the heap is saturated',
      'Runs only if the try block succeeded without errors'
    ],
    correctIndex: 1,
    explanation: 'The finally block always executes when the try-catch structure exits, guaranteeing cleanup operations like closing file streams.'
  },
  {
    id: 'java-4',
    subjectId: 'java',
    topic: 'Classes & Encapsulation',
    difficulty: 'Intermediate',
    question: 'What does the static keyword on a method signify in Java?',
    code: `public static void main(String[] args)`,
    options: [
      'The method can only be called once during runtime',
      'The method belongs to the class itself rather than instances of the class',
      'The method cannot be accessed from outside its package',
      'The method is stored in disk storage instead of JVM stack memory'
    ],
    correctIndex: 1,
    explanation: 'Static methods belong to the class rather than an object instance, allowing them to be invoked without instantiating the class.'
  },

  // --- HTML & CSS QUESTIONS ---
  {
    id: 'html-1',
    subjectId: 'html-css',
    topic: 'Semantic HTML5 Tags',
    difficulty: 'Beginner',
    question: 'Why should developers use semantic HTML tags like <nav>, <article>, and <aside>?',
    options: [
      'They increase CSS render speed by 50%',
      'They improve accessibility for screen readers and boost SEO indexing',
      'They prevent JavaScript XSS attacks automatically',
      'They are mandatory for mobile browsers to render CSS'
    ],
    correctIndex: 1,
    explanation: 'Semantic tags communicate the meaning and structure of content to assistive technologies (screen readers) and search engines.'
  },
  {
    id: 'html-2',
    subjectId: 'html-css',
    topic: 'Flexbox & CSS Grid',
    difficulty: 'Intermediate',
    question: 'In CSS Flexbox, which property aligns items along the cross axis?',
    code: `.container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}`,
    options: ['justify-content', 'align-items', 'flex-direction', 'align-content'],
    correctIndex: 1,
    explanation: 'justify-content aligns items along the main axis, while align-items aligns them along the cross axis.'
  },
  {
    id: 'html-3',
    subjectId: 'html-css',
    topic: 'Box Model & CSS Variables',
    difficulty: 'Beginner',
    question: 'What does setting box-sizing: border-box do in CSS?',
    code: `* {\n    box-sizing: border-box;\n}`,
    options: [
      'Adds a 1px solid black border around all elements',
      'Includes padding and border within the specified element width and height',
      'Forces all margins to collapse into zero',
      'Prevents inline elements from wrapping'
    ],
    correctIndex: 1,
    explanation: 'With border-box, the width and height properties include content, padding, and border, making sizing calculations predictable.'
  },
  {
    id: 'html-4',
    subjectId: 'html-css',
    topic: 'Box Model & CSS Variables',
    difficulty: 'Intermediate',
    question: 'How do you define and use a CSS custom property (variable)?',
    code: `:root { --primary-color: #8b5cf6; }\n.card { color: var(--primary-color); }`,
    options: [
      'Declare with $primary and access via $primary',
      'Declare with --variable-name and access via var(--variable-name)',
      'Declare with @var and access via @var()',
      'Declare with #root and access via ref()'
    ],
    correctIndex: 1,
    explanation: 'CSS variables are prefixed with two dashes (--name) and accessed using the var(--name) function.'
  },

  // --- UI/UX DESIGN QUESTIONS ---
  {
    id: 'ui-1',
    subjectId: 'ui-ux',
    topic: 'Visual Hierarchy & Typography',
    difficulty: 'Beginner',
    question: 'Which visual principle guides a user’s eye through content in order of importance?',
    options: ['Visual Hierarchy', 'Color Complementarity', 'Responsive Breakpoint', 'State Machine'],
    correctIndex: 0,
    explanation: 'Visual hierarchy arranges elements using size, color, contrast, and spacing to show their relative importance.'
  },
  {
    id: 'ui-2',
    subjectId: 'ui-ux',
    topic: 'Nielsen Norman Usability Heuristics',
    difficulty: 'Intermediate',
    question: 'Providing an immediate loading spinner or progress bar satisfies which usability heuristic?',
    options: [
      'Error Prevention',
      'Visibility of System Status',
      'Flexibility and Efficiency of Use',
      'Aesthetic and Minimalist Design'
    ],
    correctIndex: 1,
    explanation: 'Nielsen’s 1st heuristic "Visibility of System Status" states that designs should keep users informed about what is going on through timely feedback.'
  },
  {
    id: 'ui-3',
    subjectId: 'ui-ux',
    topic: 'Color Contrast & Accessibility (WCAG)',
    difficulty: 'Intermediate',
    question: 'According to WCAG 2.1 AA standards, what is the minimum contrast ratio required for normal body text?',
    options: ['2.5 : 1', '3.0 : 1', '4.5 : 1', '7.0 : 1'],
    correctIndex: 2,
    explanation: 'WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.'
  },
  {
    id: 'ui-4',
    subjectId: 'ui-ux',
    topic: 'Visual Hierarchy & Typography',
    difficulty: 'Beginner',
    question: 'What is "Negative Space" (White Space) used for in web interface design?',
    options: [
      'To fill empty database records with zeros',
      'To provide breathing room, reduce clutter, and group related elements',
      'To darken background cards in dark mode only',
      'To hide CSS styles until JavaScript initializes'
    ],
    correctIndex: 1,
    explanation: 'White space gives UI elements breathing room, improves reading comprehension, and establishes relationships between content.'
  },

  // --- DBMS & SQL QUESTIONS ---
  {
    id: 'dbms-1',
    subjectId: 'dbms',
    topic: 'SQL Queries & Table JOINs',
    difficulty: 'Beginner',
    question: 'Which SQL clause is used to filter records resulting from a GROUP BY statement?',
    code: `SELECT subject_id, COUNT(*) FROM battles GROUP BY subject_id HAVING COUNT(*) > 5;`,
    options: ['WHERE', 'HAVING', 'FILTER', 'LIMIT'],
    correctIndex: 1,
    explanation: 'WHERE filters individual rows before aggregation; HAVING filters aggregated groups created by GROUP BY.'
  },
  {
    id: 'dbms-2',
    subjectId: 'dbms',
    topic: 'ACID Properties & Transactions',
    difficulty: 'Intermediate',
    question: 'In relational database ACID properties, what does "Atomicity" guarantee?',
    options: [
      'All statements in a transaction either succeed completely or roll back entirely',
      'Transactions do not interfere with concurrently executing transactions',
      'Data is encrypted at the storage block level',
      'Queries run within atomic millisecond execution thresholds'
    ],
    correctIndex: 0,
    explanation: 'Atomicity ensures that a transaction is all-or-nothing: if any part fails, the entire transaction is rolled back.'
  },
  {
    id: 'dbms-3',
    subjectId: 'dbms',
    topic: 'Database Normalization (1NF, 2NF, 3NF)',
    difficulty: 'Intermediate',
    question: 'What condition must a database table satisfy to be in Third Normal Form (3NF)?',
    options: [
      'It must be in 2NF and have no transitive functional dependencies',
      'It must contain at least three foreign keys',
      'Every column must store multiple comma-separated values',
      'All primary keys must be alphanumeric strings'
    ],
    correctIndex: 0,
    explanation: 'A relation is in 3NF if it is in 2NF and non-key attributes do not depend on other non-key attributes (no transitive dependencies).'
  },
  {
    id: 'dbms-4',
    subjectId: 'dbms',
    topic: 'SQL Queries & Table JOINs',
    difficulty: 'Intermediate',
    question: 'What type of JOIN returns all records from the left table and matched records from the right table?',
    code: `SELECT u.name, b.score FROM users u LEFT JOIN battles b ON u.id = b.user_id;`,
    options: ['INNER JOIN', 'LEFT OUTER JOIN', 'CROSS JOIN', 'FULL JOIN'],
    correctIndex: 1,
    explanation: 'A LEFT JOIN returns all rows from the left table, with NULL values in the right table columns if there is no match.'
  }
];

// Achievements List
const DATA_ACHIEVEMENTS = [
  {
    id: 'first_blood',
    title: 'First Blood',
    description: 'Complete your very first Study Battle in any mode.',
    icon: '🗡️',
    xpReward: 50,
    unlocked: true,
    progress: 1,
    target: 1,
    category: 'combat'
  },
  {
    id: 'streak_warrior',
    title: 'Streak Warrior',
    description: 'Maintain a 3-day consecutive study battle streak.',
    icon: '🔥',
    xpReward: 100,
    unlocked: true,
    progress: 3,
    target: 3,
    category: 'streak'
  },
  {
    id: 'sharp_shooter',
    title: 'Sharp Shooter',
    description: 'Score a perfect 100% in any battle challenge.',
    icon: '🎯',
    xpReward: 150,
    unlocked: true,
    progress: 1,
    target: 1,
    category: 'mastery'
  },
  {
    id: 'python_master',
    title: 'Python Duelist',
    description: 'Complete 5 battles in Python.',
    icon: '🐍',
    xpReward: 100,
    unlocked: false,
    progress: 4,
    target: 5,
    category: 'subject'
  },
  {
    id: 'js_sorcerer',
    title: 'JavaScript Sorcerer',
    description: 'Complete 5 battles in JavaScript.',
    icon: '⚡',
    xpReward: 100,
    unlocked: false,
    progress: 3,
    target: 5,
    category: 'subject'
  },
  {
    id: 'chaos_victor',
    title: 'Chaos Victor',
    description: 'Win 3 high-intensity Random Battles.',
    icon: '🎲',
    xpReward: 120,
    unlocked: false,
    progress: 2,
    target: 3,
    category: 'combat'
  },
  {
    id: 'polyglot',
    title: 'Tech Polyglot',
    description: 'Battle in at least 4 different subjects or languages.',
    icon: '📚',
    xpReward: 200,
    unlocked: true,
    progress: 4,
    target: 4,
    category: 'mastery'
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Finish a 5-question quiz with 80%+ accuracy in under 60 seconds.',
    icon: '⏱️',
    xpReward: 150,
    unlocked: true,
    progress: 1,
    target: 1,
    category: 'combat'
  },
  {
    id: 'centurion',
    title: 'Centurion',
    description: 'Answer 50 questions correctly across all battle modes.',
    icon: '🌟',
    xpReward: 250,
    unlocked: false,
    progress: 38,
    target: 50,
    category: 'mastery'
  },
  {
    id: 'grandmaster',
    title: 'Code Grandmaster',
    description: 'Reach Student Level 10.',
    icon: '👑',
    xpReward: 500,
    unlocked: false,
    progress: 4,
    target: 10,
    category: 'level'
  },
  {
    id: 'pixel_perfect',
    title: 'Pixel Perfect',
    description: 'Score 100% in a UI/UX Design battle.',
    icon: '📐',
    xpReward: 100,
    unlocked: true,
    progress: 1,
    target: 1,
    category: 'subject'
  },
  {
    id: 'query_king',
    title: 'Query King',
    description: 'Score 100% in a DBMS & SQL battle.',
    icon: '🗄️',
    xpReward: 100,
    unlocked: false,
    progress: 0,
    target: 1,
    category: 'subject'
  }
];

// Sample Rule-based Study Recommendations (Ready to connect to Flask AI / ML model)
const DATA_RECOMMENDATIONS = {
  python: {
    'Variables & Data Types': {
      title: 'Review Python Data Structure Mutability',
      advice: 'Revise Tuples vs Lists. Remember: Tuples are immutable and hashable, making them suitable as dictionary keys.',
      resource: 'Python Essentials Cheat Sheet: Data Structures Section'
    },
    'List Comprehensions': {
      title: 'Practice Nested List & Dictionary Comprehensions',
      advice: 'Work on conditional filtering syntax [val for val in iterable if condition]. Avoid excessive nesting for readability.',
      resource: 'Python Comprehensions & Lambdas Quick Guide'
    },
    'Functions & Scope': {
      title: 'Deep Dive into Python Variable Scopes (LEGB)',
      advice: 'Review Local, Enclosing, Global, and Built-in namespaces, plus the use of global vs nonlocal keywords.',
      resource: 'Scope & Closures in Python'
    },
    'OOP Basics & Classes': {
      title: 'Object-Oriented Python Fundamentals',
      advice: 'Practice dunder methods (__init__, __str__, __repr__) and inheritance super() calls.',
      resource: 'Clean Architecture with Python Classes'
    }
  },
  javascript: {
    'Async/Await & Promises': {
      title: 'Master the JavaScript Event Loop & Microtasks',
      advice: 'Promises and async/await run in the microtask queue. Practice handling errors using try...catch blocks around await.',
      resource: 'Modern Asynchronous JavaScript Guide'
    },
    'Closures & Higher Order Functions': {
      title: 'Lexical Scope & Function Factories',
      advice: 'Understand how closures retain lexical scope variables. Try writing a custom memoize() function.',
      resource: 'Deep Dive: JavaScript Closures and Execution Context'
    },
    'ES6 Syntax & Scopes': {
      title: 'ES6+ Variable Declarations & Destructuring',
      advice: 'Always prefer const by default; use let when mutation is necessary. Practice object and array destructuring.',
      resource: 'ES6 to ES2024 Modern Features Handbook'
    },
    'DOM Manipulation & Events': {
      title: 'Event Delegation & DOM Performance',
      advice: 'Instead of binding listeners to dozens of items, attach a single listener to the container and inspect event.target.',
      resource: 'High-Performance Vanilla JavaScript DOM Patterns'
    }
  },
  general: {
    title: 'General Battle Recommendation',
    advice: 'Review incorrect answers immediately after each battle to strengthen memory retention through active recall.',
    resource: 'Study Battle Spaced Repetition Framework'
  }
};

// Default User Profile for Demo State
const DEFAULT_USER = {
  name: 'Alex Hunter',
  email: 'alex.hunter@studybattle.dev',
  level: 4,
  levelTitle: 'Code Gladiator',
  xp: 1250,
  xpCurrentLevel: 250,
  xpRequiredLevel: 500,
  streak: 3,
  battlesCompleted: 18,
  accuracy: 82,
  dailyGoalXp: 200,
  dailyEarnedXp: 130,
  favoriteSubject: 'Python',
  settings: {
    theme: 'default', // 'default' or 'high-contrast'
    soundEnabled: true,
    notificationsEnabled: true,
    timerMode: 'strict' // 'strict' (20s) or 'relaxed' (40s)
  }
};

// Sample Pre-loaded Battle History
const DEFAULT_BATTLE_HISTORY = [
  {
    id: 'hist-1',
    date: 'Today, 10:30 AM',
    mode: 'Topic Battle',
    subject: 'Python',
    topic: 'List Comprehensions',
    score: '4/5',
    accuracy: 80,
    xpEarned: 80
  },
  {
    id: 'hist-2',
    date: 'Yesterday, 4:15 PM',
    mode: 'Subject Battle',
    subject: 'JavaScript',
    topic: 'Full Curriculum',
    score: '5/5',
    accuracy: 100,
    xpEarned: 110
  },
  {
    id: 'hist-3',
    date: '2 days ago',
    mode: 'Random Battle',
    subject: 'Mixed Arena',
    topic: 'All Subjects',
    score: '5/6',
    accuracy: 83,
    xpEarned: 125
  },
  {
    id: 'hist-4',
    date: '3 days ago',
    mode: 'Topic Battle',
    subject: 'HTML & CSS',
    topic: 'Flexbox & CSS Grid',
    score: '4/4',
    accuracy: 100,
    xpEarned: 90
  }
];
