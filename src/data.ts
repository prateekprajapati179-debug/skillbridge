import type { DSAQuestion, ResourceCard } from './types';

export const SKILLS_OPTIONS = ['Python', 'JavaScript', 'C++', 'Java', 'None'];

export const DREAM_JOB_OPTIONS = [
  'Full Stack Dev',
  'Data Scientist',
  'ML Engineer',
  'Mobile Dev',
  'DevOps',
];

export const COMPANY_OPTIONS = ['Google', 'Amazon', 'Microsoft', 'Flipkart', 'Zomato'];

export const YEAR_OPTIONS = ['1st', '2nd', '3rd', '4th', 'Working'];

export const LEARNING_STYLES = ['Videos', 'Reading', 'Projects', 'All'];

export const DSA_QUESTIONS: Record<string, DSAQuestion[]> = {
  Google: [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays', leetcodeUrl: 'https://leetcode.com/problems/two-sum/' },
    { id: 2, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', topic: 'Binary Search', leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
    { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topic: 'Sliding Window', leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
    { id: 4, title: 'Word Ladder', difficulty: 'Hard', topic: 'BFS/Graph', leetcodeUrl: 'https://leetcode.com/problems/word-ladder/' },
    { id: 5, title: 'LRU Cache', difficulty: 'Medium', topic: 'Design', leetcodeUrl: 'https://leetcode.com/problems/lru-cache/' },
    { id: 6, title: 'Trapping Rain Water', difficulty: 'Hard', topic: 'Two Pointers', leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/' },
    { id: 7, title: 'Number of Islands', difficulty: 'Medium', topic: 'DFS/BFS', leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/' },
    { id: 8, title: 'Maximum Subarray', difficulty: 'Medium', topic: 'DP', leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/' },
    { id: 9, title: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stack', leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/' },
    { id: 10, title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', topic: 'Trees', leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
  ],
  Amazon: [
    { id: 1, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', topic: 'Arrays', leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
    { id: 2, title: 'Top K Frequent Elements', difficulty: 'Medium', topic: 'Heap', leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/' },
    { id: 3, title: 'Merge Intervals', difficulty: 'Medium', topic: 'Sorting', leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/' },
    { id: 4, title: 'Course Schedule', difficulty: 'Medium', topic: 'Topological Sort', leetcodeUrl: 'https://leetcode.com/problems/course-schedule/' },
    { id: 5, title: 'Copy List with Random Pointer', difficulty: 'Medium', topic: 'Linked List', leetcodeUrl: 'https://leetcode.com/problems/copy-list-with-random-pointer/' },
    { id: 6, title: 'Spiral Matrix', difficulty: 'Medium', topic: 'Matrix', leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix/' },
    { id: 7, title: 'Sliding Window Maximum', difficulty: 'Hard', topic: 'Deque', leetcodeUrl: 'https://leetcode.com/problems/sliding-window-maximum/' },
    { id: 8, title: 'Minimum Path Sum', difficulty: 'Medium', topic: 'DP', leetcodeUrl: 'https://leetcode.com/problems/minimum-path-sum/' },
    { id: 9, title: 'Palindrome Linked List', difficulty: 'Easy', topic: 'Linked List', leetcodeUrl: 'https://leetcode.com/problems/palindrome-linked-list/' },
    { id: 10, title: 'Robot Room Cleaner', difficulty: 'Hard', topic: 'DFS', leetcodeUrl: 'https://leetcode.com/problems/robot-room-cleaner/' },
  ],
  Microsoft: [
    { id: 1, title: 'Reverse Linked List', difficulty: 'Easy', topic: 'Linked List', leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/' },
    { id: 2, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', topic: 'BFS', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
    { id: 3, title: 'Clone Graph', difficulty: 'Medium', topic: 'Graph', leetcodeUrl: 'https://leetcode.com/problems/clone-graph/' },
    { id: 4, title: 'Find Median from Data Stream', difficulty: 'Hard', topic: 'Heap', leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/' },
    { id: 5, title: 'Implement Trie', difficulty: 'Medium', topic: 'Trie', leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
    { id: 6, title: 'Alien Dictionary', difficulty: 'Hard', topic: 'Topological Sort', leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/' },
    { id: 7, title: 'Coin Change', difficulty: 'Medium', topic: 'DP', leetcodeUrl: 'https://leetcode.com/problems/coin-change/' },
    { id: 8, title: 'Product of Array Except Self', difficulty: 'Medium', topic: 'Arrays', leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/' },
    { id: 9, title: 'Missing Number', difficulty: 'Easy', topic: 'Math', leetcodeUrl: 'https://leetcode.com/problems/missing-number/' },
    { id: 10, title: 'Minimum Window Substring', difficulty: 'Hard', topic: 'Sliding Window', leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/' },
  ],
  Flipkart: [
    { id: 1, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', topic: 'Binary Search', leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
    { id: 2, title: 'Jump Game', difficulty: 'Medium', topic: 'Greedy', leetcodeUrl: 'https://leetcode.com/problems/jump-game/' },
    { id: 3, title: 'Word Search', difficulty: 'Medium', topic: 'Backtracking', leetcodeUrl: 'https://leetcode.com/problems/word-search/' },
    { id: 4, title: 'Kth Largest Element in Array', difficulty: 'Medium', topic: 'Heap', leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
    { id: 5, title: 'Longest Palindromic Substring', difficulty: 'Medium', topic: 'DP', leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/' },
    { id: 6, title: 'Container With Most Water', difficulty: 'Medium', topic: 'Two Pointers', leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/' },
    { id: 7, title: 'Decode Ways', difficulty: 'Medium', topic: 'DP', leetcodeUrl: 'https://leetcode.com/problems/decode-ways/' },
    { id: 8, title: 'Rotate Image', difficulty: 'Medium', topic: 'Matrix', leetcodeUrl: 'https://leetcode.com/problems/rotate-image/' },
    { id: 9, title: 'Group Anagrams', difficulty: 'Medium', topic: 'Hashing', leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/' },
    { id: 10, title: 'Set Matrix Zeroes', difficulty: 'Medium', topic: 'Matrix', leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/' },
  ],
  Zomato: [
    { id: 1, title: 'Two Sum II', difficulty: 'Easy', topic: 'Two Pointers', leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
    { id: 2, title: 'Maximum Product Subarray', difficulty: 'Medium', topic: 'DP', leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/' },
    { id: 3, title: 'Find All Anagrams in a String', difficulty: 'Medium', topic: 'Sliding Window', leetcodeUrl: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/' },
    { id: 4, title: 'Flatten Nested List Iterator', difficulty: 'Medium', topic: 'Stack', leetcodeUrl: 'https://leetcode.com/problems/flatten-nested-list-iterator/' },
    { id: 5, title: 'Min Stack', difficulty: 'Easy', topic: 'Stack', leetcodeUrl: 'https://leetcode.com/problems/min-stack/' },
    { id: 6, title: 'Subarray Sum Equals K', difficulty: 'Medium', topic: 'Prefix Sum', leetcodeUrl: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
    { id: 7, title: 'Linked List Cycle', difficulty: 'Easy', topic: 'Linked List', leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/' },
    { id: 8, title: 'Meeting Rooms II', difficulty: 'Medium', topic: 'Intervals', leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/' },
    { id: 9, title: 'Sort Colors', difficulty: 'Medium', topic: 'Two Pointers', leetcodeUrl: 'https://leetcode.com/problems/sort-colors/' },
    { id: 10, title: 'Longest Common Subsequence', difficulty: 'Medium', topic: 'DP', leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/' },
  ],
};

export const LEARNING_TRACKS: Record<string, ResourceCard[]> = {
  DSA: [
    { name: 'LeetCode 75', description: 'Curated 75 problems covering all DSA patterns for top company interviews.', url: 'https://leetcode.com/studyplan/leetcode-75/', level: 'Beginner to Advanced', duration: '8 weeks' },
    { name: 'Striver\'s A2Z DSA Sheet', description: 'Complete DSA roadmap with 450+ problems by Raj Vikramaditya.', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', level: 'Beginner', duration: '16 weeks' },
    { name: 'Abdul Bari Algorithms', description: 'YouTube playlist for algorithms from scratch — highly recommended for visual learners.', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O', level: 'Intermediate', duration: '6 weeks' },
    { name: 'GeeksforGeeks DSA Self-Paced', description: 'Structured course with theory, videos, and practice problems on GFG.', url: 'https://www.geeksforgeeks.org/dsa-self-paced-course/', level: 'Beginner', duration: '12 weeks' },
    { name: 'NeetCode 150', description: 'Hand-picked 150 LeetCode problems with video solutions by NeetCode.', url: 'https://neetcode.io/practice', level: 'Intermediate', duration: '10 weeks' },
  ],
  'AI/ML': [
    { name: 'Fast.ai Deep Learning', description: 'Practical deep learning for coders — top-down approach by Jeremy Howard.', url: 'https://course.fast.ai/', level: 'Intermediate', duration: '12 weeks' },
    { name: 'Andrew Ng ML Specialization', description: 'The classic Machine Learning course on Coursera covering all ML fundamentals.', url: 'https://www.coursera.org/specializations/machine-learning-introduction', level: 'Beginner', duration: '11 weeks' },
    { name: 'Kaggle Learn', description: 'Free micro-courses on Python, ML, deep learning, and data viz by Kaggle.', url: 'https://www.kaggle.com/learn', level: 'Beginner', duration: '4 weeks' },
    { name: 'CS229 Stanford Notes', description: 'Andrew Ng\'s Stanford ML course notes and problem sets — theoretical depth.', url: 'https://cs229.stanford.edu/', level: 'Advanced', duration: '16 weeks' },
    { name: 'Hugging Face NLP Course', description: 'Free NLP course from Hugging Face covering Transformers, BERT, GPT, and more.', url: 'https://huggingface.co/learn/nlp-course/', level: 'Intermediate', duration: '8 weeks' },
  ],
  'Web Dev': [
    { name: 'The Odin Project', description: 'Full stack web development curriculum — completely free and project-based.', url: 'https://www.theodinproject.com/', level: 'Beginner', duration: '20 weeks' },
    { name: 'freeCodeCamp Full Stack', description: 'Comprehensive web dev curriculum with 300+ hours of free learning content.', url: 'https://www.freecodecamp.org/', level: 'Beginner', duration: '24 weeks' },
    { name: 'React Official Docs', description: 'Official React documentation with new interactive beta tutorial.', url: 'https://react.dev/learn', level: 'Intermediate', duration: '4 weeks' },
    { name: 'Full Stack Open (Helsinki)', description: 'University of Helsinki\'s modern web dev course with React, Node, GraphQL.', url: 'https://fullstackopen.com/en/', level: 'Intermediate', duration: '14 weeks' },
    { name: 'JavaScript.info', description: 'The Modern JavaScript Tutorial — thorough and well-explained from basics to advanced.', url: 'https://javascript.info/', level: 'Beginner', duration: '6 weeks' },
  ],
  'App Dev': [
    { name: 'Flutter Official Docs', description: 'Google\'s Flutter documentation with codelabs for building cross-platform apps.', url: 'https://docs.flutter.dev/get-started/codelab', level: 'Beginner', duration: '8 weeks' },
    { name: 'React Native by Meta', description: 'Official React Native guide for building native iOS/Android apps with JavaScript.', url: 'https://reactnative.dev/docs/getting-started', level: 'Intermediate', duration: '10 weeks' },
    { name: 'Android Basics in Kotlin', description: 'Google\'s official Android development course in Kotlin for absolute beginners.', url: 'https://developer.android.com/courses/android-basics-kotlin/course', level: 'Beginner', duration: '12 weeks' },
    { name: 'CS193p iOS Development', description: 'Stanford\'s iOS app development course using SwiftUI — completely free on YouTube.', url: 'https://cs193p.sites.stanford.edu/', level: 'Intermediate', duration: '10 weeks' },
    { name: 'App Brewery Flutter Bootcamp', description: 'Angela Yu\'s highly rated Flutter bootcamp with 28+ hours of project-based content.', url: 'https://www.udemy.com/course/flutter-bootcamp-with-dart/', level: 'Beginner', duration: '8 weeks' },
  ],
};

export const MOCK_ROADMAP = {
  missingSkills: ['React', 'Node.js', 'SQL', 'System Design', 'TypeScript'],
  estimatedWeeks: 16,
  weeklyPlan: [
    {
      week: 1,
      topic: 'HTML & CSS Fundamentals',
      tasks: ['Learn HTML5 semantic tags', 'CSS Flexbox and Grid', 'Build a responsive layout'],
      resources: [
        { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
        { title: 'CSS Tricks', url: 'https://css-tricks.com/' },
      ],
    },
    {
      week: 2,
      topic: 'JavaScript Essentials',
      tasks: ['ES6+ features', 'Async/Await and Promises', 'DOM manipulation'],
      resources: [
        { title: 'JavaScript.info', url: 'https://javascript.info/' },
        { title: 'freeCodeCamp JS', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/' },
      ],
    },
    {
      week: 3,
      topic: 'React Basics',
      tasks: ['Components and Props', 'State and useState hook', 'Build a todo app'],
      resources: [
        { title: 'React Official Docs', url: 'https://react.dev/learn' },
        { title: 'React YouTube Tutorial', url: 'https://www.youtube.com/watch?v=SqcY0GlETPk' },
      ],
    },
    {
      week: 4,
      topic: 'Node.js & Express',
      tasks: ['Setup Node.js server', 'REST API design', 'Connect to a database'],
      resources: [
        { title: 'Node.js Docs', url: 'https://nodejs.org/en/docs/' },
        { title: 'Express Guide', url: 'https://expressjs.com/en/guide/routing.html' },
      ],
    },
    {
      week: 5,
      topic: 'SQL & Databases',
      tasks: ['SQL CRUD operations', 'Joins and aggregations', 'PostgreSQL setup'],
      resources: [
        { title: 'SQLZoo', url: 'https://sqlzoo.net/' },
        { title: 'PostgreSQL Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html' },
      ],
    },
    {
      week: 6,
      topic: 'TypeScript',
      tasks: ['Types and interfaces', 'Generics basics', 'Convert a JS project to TS'],
      resources: [
        { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/' },
        { title: 'TS Deep Dive', url: 'https://basarat.gitbook.io/typescript/' },
      ],
    },
  ],
};

export const TOPIC_AREAS = [
  { label: 'Data Science', value: 'data-science' },
  { label: 'Machine Learning', value: 'ml' },
  { label: 'Web Development', value: 'web-dev' },
  { label: 'Mobile Development', value: 'mobile-dev' },
  { label: 'Cloud & DevOps', value: 'devops' },
  { label: 'System Design', value: 'system-design' },
];

export const MOCK_BADGES = ['First Quiz', 'DSA Master', 'Full Stack', 'AI Pioneer', 'Web Developer', 'Mobile Expert'];
