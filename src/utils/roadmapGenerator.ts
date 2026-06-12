import type { QuizAnswers, RoadmapData, RoadmapWeek } from '../types';

function getYearMultiplier(year: string): number {
  switch (year) {
    case '1st': return 1.5;
    case '2nd': return 1.2;
    case '3rd': return 1.0;
    case '4th': return 0.8;
    case 'Working': return 0.6;
    default: return 1.0;
  }
}

function getRoleDetails(dreamJob: string): { skills: string[]; baseWeeks: number } {
  const roles: Record<string, { skills: string[]; baseWeeks: number }> = {
    'Full Stack Dev': {
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'REST APIs', 'TypeScript'],
      baseWeeks: 16,
    },
    'Data Scientist': {
      skills: ['Python', 'Statistics', 'SQL', 'Pandas', 'Machine Learning', 'Data Visualization', 'NumPy', 'Scikit-learn'],
      baseWeeks: 20,
    },
    'ML Engineer': {
      skills: ['Python', 'TensorFlow/PyTorch', 'Deep Learning', 'MLOps', 'Statistics', 'Data Structures', 'Algorithms', 'Cloud'],
      baseWeeks: 22,
    },
    'Mobile Dev': {
      skills: ['Dart/Flutter', 'React Native or Swift/Kotlin', 'Mobile UI/UX', 'State Management', 'APIs', 'Git', 'App Store Deployment'],
      baseWeeks: 16,
    },
    'DevOps': {
      skills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'AWS/GCP', 'Terraform', 'Networking', 'Scripting'],
      baseWeeks: 18,
    },
  };
  return roles[dreamJob] || roles['Full Stack Dev'];
}

interface TopicDetail {
  topic: string;
  tasks: string[];
  resources: { title: string; url: string }[];
}

const topicsPerRole: Record<string, TopicDetail[]> = {
  'Full Stack Dev': [
    {
      topic: 'HTML & CSS Foundations',
      tasks: ['Learn HTML5 semantic tags', 'Understand CSS Box Model and basic selectors', 'Build a simple web page layout'],
      resources: [
        { title: 'freeCodeCamp Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' },
        { title: 'MDN HTML & CSS Guides', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML' },
      ],
    },
    {
      topic: 'Advanced CSS, Flexbox & Grid',
      tasks: ['Master CSS Flexbox layouts', 'Learn CSS Grid layouts for complex grids', 'Build a responsive pricing table'],
      resources: [
        { title: 'CSS-Tricks Flexbox Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
        { title: 'Flexbox Froggy Game', url: 'https://flexboxfroggy.com/' },
      ],
    },
    {
      topic: 'Git & Version Control',
      tasks: ['Initialize git repository and track changes', 'Learn branching, merging, and resolving conflicts', 'Create a GitHub account and push your first repo'],
      resources: [
        { title: 'GitHub Git Handbook', url: 'https://docs.github.com/en/get-started/using-git/about-git' },
        { title: 'Git Immersion Tutorial', url: 'https://gitimmersion.com/' },
      ],
    },
    {
      topic: 'JavaScript Basics',
      tasks: ['Understand variables, data types, and operators', 'Learn functions, loops, and conditional statements', 'Write simple JS algorithms'],
      resources: [
        { title: 'JavaScript.info - The Basics', url: 'https://javascript.info/first-steps' },
        { title: 'freeCodeCamp JS Basics', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/' },
      ],
    },
    {
      topic: 'Advanced JS & DOM Manipulation',
      tasks: ['Learn ES6+ features (destructuring, arrow functions)', 'Understand DOM selection and manipulation', 'Build an interactive Todo List app'],
      resources: [
        { title: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net/' },
        { title: 'JavaScript.info DOM Manipulation', url: 'https://javascript.info/document' },
      ],
    },
    {
      topic: 'Async JavaScript & APIs',
      tasks: ['Understand Promises and async/await syntax', 'Learn how to fetch data from APIs using fetch()', 'Build a weather app using a public weather API'],
      resources: [
        { title: 'MDN Asynchronous JS', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous' },
        { title: 'JSONPlaceholder API Sandbox', url: 'https://jsonplaceholder.typicode.com/' },
      ],
    },
    {
      topic: 'React Fundamentals',
      tasks: ['Understand React Components, JSX, and Props', 'Learn state management with useState hook', 'Create a counter and a list display app'],
      resources: [
        { title: 'React Official Quick Start', url: 'https://react.dev/learn' },
        { title: 'Scrimba Learn React', url: 'https://scrimba.com/learn/learnreact' },
      ],
    },
    {
      topic: 'React Hooks & Dynamic UIs',
      tasks: ['Understand useEffect hook for side effects', 'Handle forms and controlled inputs in React', 'Build a dynamic search filter app'],
      resources: [
        { title: 'React Hooks Docs', url: 'https://react.dev/reference/react' },
        { title: 'React Dev Tools Tutorial', url: 'https://react.dev/learn/react-developer-tools' },
      ],
    },
    {
      topic: 'TypeScript Basics',
      tasks: ['Learn basic types (string, number, boolean, any)', 'Define TypeScript interfaces and type aliases', 'Refactor a small JS file to TS'],
      resources: [
        { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
        { title: 'TypeScript Deep Dive', url: 'https://basarat.gitbook.io/typescript/' },
      ],
    },
    {
      topic: 'Node.js & Express Basics',
      tasks: ['Understand Node.js runtime environment', 'Setup an Express server and define basic endpoints', 'Handle incoming query params and route parameters'],
      resources: [
        { title: 'Node.js Official Guides', url: 'https://nodejs.org/en/docs/' },
        { title: 'Express Routing Guide', url: 'https://expressjs.com/en/guide/routing.html' },
      ],
    },
    {
      topic: 'RESTful API Design',
      tasks: ['Learn REST guidelines (GET, POST, PUT, DELETE)', 'Implement route middleware for request parsing', 'Build a CRUD API using Express'],
      resources: [
        { title: 'RESTful API Tutorial', url: 'https://restfulapi.net/' },
        { title: 'Postman API Testing Guide', url: 'https://learning.postman.com/docs/getting-started/introduction/' },
      ],
    },
    {
      topic: 'Database Design & SQL',
      tasks: ['Install and setup PostgreSQL or SQLite', 'Learn SQL syntax for SELECT, INSERT, UPDATE, DELETE', 'Run table joins and aggregations'],
      resources: [
        { title: 'SQLZoo Interactive Tutorials', url: 'https://sqlzoo.net/' },
        { title: 'PostgreSQL Tutorial Website', url: 'https://www.postgresqltutorial.com/' },
      ],
    },
    {
      topic: 'Connecting Database to Server',
      tasks: ['Connect Express server to database using pg client or Prisma', 'Perform CRUD operations on database from API routes', 'Handle database connection pooling and query errors'],
      resources: [
        { title: 'Prisma Quickstart Guide', url: 'https://www.prisma.io/docs/getting-started' },
        { title: 'Node-Postgres Library Docs', url: 'https://node-postgres.com/' },
      ],
    },
    {
      topic: 'Authentication & Security',
      tasks: ['Implement password hashing with bcrypt', 'Understand JWT authentication flow', 'Secure API endpoints with authorization headers'],
      resources: [
        { title: 'Auth0 JWT Introduction', url: 'https://jwt.io/introduction' },
        { title: 'JWT Authentication Tutorial', url: 'https://javascript.info/localstorage' },
      ],
    },
    {
      topic: 'State Management & Context API',
      tasks: ['Learn React Context API for global state', 'Understand state managers like Zustand or Redux Toolkit', 'Manage complex user cart/session state'],
      resources: [
        { title: 'Zustand Github & Docs', url: 'https://github.com/pmndrs/zustand' },
        { title: 'Redux Toolkit Quick Start', url: 'https://redux-toolkit.js.org/introduction/quick-start' },
      ],
    },
    {
      topic: 'Frontend Deployment & Basic CI/CD',
      tasks: ['Deploy frontend app on Vercel or Netlify', 'Deploy backend app on Render or Railway', 'Setup continuous deployment from GitHub triggers'],
      resources: [
        { title: 'Vercel Deployment Guide', url: 'https://vercel.com/docs' },
        { title: 'Railway Backend Deployment Docs', url: 'https://docs.railway.app/' },
      ],
    },
  ],
  'Data Scientist': [
    {
      topic: 'Python Programming Basics',
      tasks: ['Setup Python environment with Anaconda/Jupyter', 'Learn variables, lists, dicts, and loops', 'Write basic Python functions'],
      resources: [
        { title: 'Kaggle Learn Python Course', url: 'https://www.kaggle.com/learn/python' },
        { title: 'Python.org Beginner Guide', url: 'https://www.python.org/about/gettingstarted/' },
      ],
    },
    {
      topic: 'Advanced Python for Data Science',
      tasks: ['Learn list comprehensions and lambda functions', 'Understand file I/O operations and exception handling', 'Master virtual environments and pip packages'],
      resources: [
        { title: 'Real Python Tutorials', url: 'https://realpython.com/' },
        { title: 'W3Schools Advanced Python', url: 'https://www.w3schools.com/python/' },
      ],
    },
    {
      topic: 'Statistics & Probability Fundamentals',
      tasks: ['Learn mean, median, mode, variance, and standard deviation', 'Understand probability distributions (Normal, Binomial)', 'Study hypothesis testing and p-values'],
      resources: [
        { title: 'Khan Academy College Statistics', url: 'https://www.khanacademy.org/math/statistics-probability' },
        { title: 'StatQuest Statistics Playlist', url: 'https://youtube.com/c/joshstarmer' },
      ],
    },
    {
      topic: 'NumPy for Scientific Computing',
      tasks: ['Understand NumPy arrays and vectorization', 'Perform matrix math and array manipulation', 'Learn indexing and boolean masking'],
      resources: [
        { title: 'NumPy Quickstart Tutorial', url: 'https://numpy.org/doc/stable/user/quickstart.html' },
        { title: 'W3Schools NumPy Tutorial', url: 'https://www.w3schools.com/python/numpy_intro.asp' },
      ],
    },
    {
      topic: 'Pandas for Data Manipulation',
      tasks: ['Learn Pandas Series and DataFrames', 'Load CSV, Excel, and JSON data files', 'Filter, sort, and group DataFrame records'],
      resources: [
        { title: 'Kaggle Learn Pandas Course', url: 'https://www.kaggle.com/learn/pandas' },
        { title: 'Pandas Official Tutorials', url: 'https://pandas.pydata.org/docs/getting_started/index.html' },
      ],
    },
    {
      topic: 'Data Cleaning & Preprocessing',
      tasks: ['Handle missing values (drop, impute)', 'Remove duplicate entries and fix data formatting', 'Parse dates and handle categorical strings'],
      resources: [
        { title: 'Data Cleaning Guide - Towards Data Science', url: 'https://towardsdatascience.com/data-cleaning-with-python-and-pandas-774f7474556' },
        { title: 'Pandas Handling Missing Data', url: 'https://pandas.pydata.org/docs/user_guide/missing_data.html' },
      ],
    },
    {
      topic: 'Exploratory Data Analysis (EDA)',
      tasks: ['Analyze data distributions and summary statistics', 'Find correlations between features', 'Identify outliers and skewness in data'],
      resources: [
        { title: 'EDA Tutorial on Kaggle', url: 'https://www.kaggle.com/code/kashnitsky/topic-1-exploratory-data-analysis-with-pandas' },
        { title: 'Exploratory Data Analysis Basics', url: 'https://www.ibm.com/topics/exploratory-data-analysis' },
      ],
    },
    {
      topic: 'Data Visualization (Matplotlib & Seaborn)',
      tasks: ['Plot histograms, scatter plots, and box plots', 'Create customized heatmaps and pairplots', 'Interpret visualizations to derive insights'],
      resources: [
        { title: 'Kaggle Learn Data Viz', url: 'https://www.kaggle.com/learn/data-visualization' },
        { title: 'Matplotlib Documentation', url: 'https://matplotlib.org/stable/tutorials/index.html' },
      ],
    },
    {
      topic: 'SQL for Data Querying',
      tasks: ['Write basic SQL queries with SELECT, WHERE', 'Use GROUP BY, HAVING, and aggregation functions', 'Run JOIN queries to combine tables'],
      resources: [
        { title: 'SQLZoo Interactive Guide', url: 'https://sqlzoo.net/' },
        { title: 'Mode Analytics SQL Tutorial', url: 'https://mode.com/sql-tutorial/' },
      ],
    },
    {
      topic: 'Advanced SQL & Database Connections',
      tasks: ['Write Subqueries and Common Table Expressions (CTEs)', 'Learn SQL window functions', 'Query databases from Jupyter Notebooks using sqlalchemy'],
      resources: [
        { title: 'Mode SQL Advanced', url: 'https://mode.com/sql-tutorial/sql-window-functions/' },
        { title: 'SQLAlchemy Tutorials', url: 'https://www.sqlalchemy.org/' },
      ],
    },
    {
      topic: 'Machine Learning Introduction',
      tasks: ['Understand Supervised vs Unsupervised learning', 'Understand overfitting, underfitting, and train/test splits', 'Learn Scikit-learn API basics'],
      resources: [
        { title: 'Andrew Ng ML Course', url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
        { title: 'Scikit-learn Getting Started', url: 'https://scikit-learn.org/stable/getting_started.html' },
      ],
    },
    {
      topic: 'Supervised Learning: Regression',
      tasks: ['Understand Simple & Multiple Linear Regression', 'Train regression models and calculate MSE/R-squared', 'Build housing price predictor'],
      resources: [
        { title: 'StatQuest Regression Explained', url: 'https://youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O' },
        { title: 'Kaggle Intro to Machine Learning', url: 'https://www.kaggle.com/learn/intro-to-machine-learning' },
      ],
    },
    {
      topic: 'Supervised Learning: Classification',
      tasks: ['Learn Logistic Regression, Decision Trees', 'Train classifiers and calculate accuracy/F1-score', 'Build email spam filter'],
      resources: [
        { title: 'Scikit-learn Classification Guide', url: 'https://scikit-learn.org/stable/supervised_learning.html#supervised-learning' },
        { title: 'Machine Learning Mastery Classification', url: 'https://machinelearningmastery.com/' },
      ],
    },
    {
      topic: 'Unsupervised Learning: Clustering',
      tasks: ['Understand K-Means Clustering algorithm', 'Determine optimal clusters using Elbow method', 'Learn PCA for dimensionality reduction'],
      resources: [
        { title: 'Scikit-learn Clustering documentation', url: 'https://scikit-learn.org/stable/modules/clustering.html' },
        { title: 'Kaggle K-Means Tutorial', url: 'https://www.kaggle.com/code/subhajeetdas/k-means-clustering-tutorial' },
      ],
    },
    {
      topic: 'Model Evaluation & Validation',
      tasks: ['Implement K-Fold Cross Validation', 'Read Confusion Matrices, Precision-Recall curves', 'Tweak hyperparameters using GridSearchCV'],
      resources: [
        { title: 'Scikit-learn Model Evaluation docs', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html' },
        { title: 'Kaggle Intermediate ML Course', url: 'https://www.kaggle.com/learn/intermediate-machine-learning' },
      ],
    },
    {
      topic: 'Feature Engineering & Selection',
      tasks: ['Implement One-Hot encoding and scaling (StandardScaler)', 'Handle high cardinality categorical variables', 'Select top features using correlation/feature importances'],
      resources: [
        { title: 'Kaggle Feature Engineering course', url: 'https://www.kaggle.com/learn/feature-engineering' },
        { title: 'Feature Selection Guide', url: 'https://machinelearningmastery.com/feature-selection-with-real-and-categorical-data/' },
      ],
    },
    {
      topic: 'Deep Learning Introduction',
      tasks: ['Understand Perceptrons and Artificial Neural Networks', 'Learn forward and backward propagation', 'Use Keras/TensorFlow for simple models'],
      resources: [
        { title: 'Kaggle Intro to Deep Learning', url: 'https://www.kaggle.com/learn/intro-to-deep-learning' },
        { title: '3Blue1Brown Neural Networks', url: 'https://youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi' },
      ],
    },
    {
      topic: 'Working with Time Series Data',
      tasks: ['Learn datetime parsing and resampling in Pandas', 'Identify trend and seasonality components', 'Train forecasting models like ARIMA'],
      resources: [
        { title: 'Kaggle Time Series course', url: 'https://www.kaggle.com/learn/time-series' },
        { title: 'Pandas Time Series guide', url: 'https://pandas.pydata.org/docs/user_guide/timeseries.html' },
      ],
    },
    {
      topic: 'NLP Basics & Text Preprocessing',
      tasks: ['Tokenize text and remove stop words using NLTK/spaCy', 'Convert text to vectors with TF-IDF', 'Train simple text classifiers'],
      resources: [
        { title: 'Hugging Face NLP Course Intro', url: 'https://huggingface.co/learn/nlp-course/chapter1/1' },
        { title: 'spaCy 101 Guide', url: 'https://spacy.io/usage/spacy-101' },
      ],
    },
    {
      topic: 'Capstone Project',
      tasks: ['Choose a real-world dataset (e.g. Kaggle/UCI)', 'Perform complete EDA and data preparation', 'Train and evaluate multiple models and summarize findings'],
      resources: [
        { title: 'Kaggle Datasets Hub', url: 'https://www.kaggle.com/datasets' },
        { title: 'UCI Machine Learning Repository', url: 'https://archive.ics.uci.edu/' },
      ],
    },
  ],
  'ML Engineer': [
    {
      topic: 'Python Advanced Concepts',
      tasks: ['Understand generators, decorators, and context managers', 'Learn object-oriented programming (classes, inheritance)', 'Master writing clean PEP 8 compliant code'],
      resources: [
        { title: 'Real Python OOP guide', url: 'https://realpython.com/python3-object-oriented-programming/' },
        { title: 'Corey Schafer Python Playlist', url: 'https://youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhFcTXm3gseHPGP' },
      ],
    },
    {
      topic: 'Data Structures & Algorithms (DSA)',
      tasks: ['Implement Binary Search and Sorting algorithms', 'Understand Lists, Stacks, Queues, and Hash Maps', 'Analyze time/space complexity (Big O)'],
      resources: [
        { title: 'NeetCode Roadmap', url: 'https://neetcode.io/roadmap' },
        { title: 'GeeksforGeeks Python DSA', url: 'https://www.geeksforgeeks.org/data-structures-in-python/' },
      ],
    },
    {
      topic: 'Linear Algebra & Calculus for ML',
      tasks: ['Understand matrices, eigenvectors, and eigenvalues', 'Learn partial derivatives and gradient descent optimization', 'Study matrix operations in NumPy'],
      resources: [
        { title: 'Imperial College Linear Algebra Course', url: 'https://www.coursera.org/specializations/mathematics-machine-learning' },
        { title: '3Blue1Brown Essence of Calculus', url: 'https://youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr' },
      ],
    },
    {
      topic: 'Probability & Mathematical Statistics',
      tasks: ['Learn Bayes theorem and conditional probability', 'Understand parameter estimation (MLE)', 'Study random variables and variance bounds'],
      resources: [
        { title: 'Khan Academy Probability', url: 'https://www.khanacademy.org/math/statistics-probability/probability-library' },
        { title: 'StatQuest Probability Fundamentals', url: 'https://youtube.com/c/joshstarmer' },
      ],
    },
    {
      topic: 'Data Preprocessing & Scikit-learn',
      tasks: ['Implement pipelines for custom transformers', 'Perform scaling, standardizing, and imputation', 'Evaluate features using ANOVA/Mutual Information'],
      resources: [
        { title: 'Scikit-Learn Pipeline documentation', url: 'https://scikit-learn.org/stable/modules/compose.html' },
        { title: 'Kaggle Feature Engineering', url: 'https://www.kaggle.com/learn/feature-engineering' },
      ],
    },
    {
      topic: 'Core ML Algorithms',
      tasks: ['Understand Support Vector Machines (SVM) & Random Forests', 'Learn Gradient Boosting (XGBoost/LightGBM)', 'Tune hyperparameters using Optuna/RandomSearchCV'],
      resources: [
        { title: 'XGBoost Official Tutorial', url: 'https://xgboost.readthedocs.io/en/stable/' },
        { title: 'Optuna Documentation', url: 'https://optuna.org/' },
      ],
    },
    {
      topic: 'Deep Learning Basics',
      tasks: ['Understand activation functions (ReLU, Sigmoid, Softmax)', 'Understand loss functions and optimizer math (Adam, SGD)', 'Build a basic multi-layer perceptron'],
      resources: [
        { title: 'Fast.ai Practical Deep Learning', url: 'https://course.fast.ai/' },
        { title: 'DeepLearning.AI Neural Networks course', url: 'https://www.coursera.org/learn/neural-networks-deep-learning' },
      ],
    },
    {
      topic: 'PyTorch/TensorFlow Framework Basics',
      tasks: ['Understand tensors, autograd, and computation graphs', 'Define neural network architecture using PyTorch nn.Module', 'Implement training loop with gradient stepping'],
      resources: [
        { title: 'PyTorch Learning Path', url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html' },
        { title: 'TensorFlow Beginners Guide', url: 'https://www.tensorflow.org/tutorials/quickstart/beginner' },
      ],
    },
    {
      topic: 'Training Deep Neural Networks',
      tasks: ['Implement batch normalization and dropout regularizations', 'Handle learning rate scheduling and early stopping', 'Log metrics with TensorBoard/WandB'],
      resources: [
        { title: 'PyTorch Ignite/Lightning introduction', url: 'https://pytorchlightning.ai/' },
        { title: 'Weights & Biases quickstart', url: 'https://docs.wandb.ai/quickstart' },
      ],
    },
    {
      topic: 'Computer Vision (CNNs)',
      tasks: ['Understand convolution and pooling layers', 'Build a CNN from scratch for image classification', 'Learn transfer learning with ResNet/VGG'],
      resources: [
        { title: 'CS231n Stanford CV Lectures', url: 'https://cs231n.github.com/' },
        { title: 'PyTorch Transfer Learning guide', url: 'https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html' },
      ],
    },
    {
      topic: 'Natural Language Processing (NLP)',
      tasks: ['Understand Word Embeddings (Word2Vec, GloVe)', 'Learn Recurrent Neural Networks (RNNs) and LSTMs', 'Build a sequence-to-sequence model for translation'],
      resources: [
        { title: 'Stanford CS224n NLP with Deep Learning', url: 'https://web.stanford.edu/class/cs224n/' },
        { title: 'PyTorch NLP tutorial', url: 'https://pytorch.org/tutorials/beginner/deep_learning_nlp_tutorial.html' },
      ],
    },
    {
      topic: 'Transformers & LLMs',
      tasks: ['Understand Self-Attention and Transformer architecture', 'Study BERT and GPT pretraining techniques', 'Fine-tune pre-trained models using Hugging Face'],
      resources: [
        { title: 'Hugging Face Learn Hub', url: 'https://huggingface.co/learn' },
        { title: 'The Illustrated Transformer blog', url: 'http://jalammar.github.io/illustrated-transformer/' },
      ],
    },
    {
      topic: 'Hugging Face Course & Fine-Tuning',
      tasks: ['Use HF Transformers pipelines for NLP tasks', 'Apply parameter-efficient fine-tuning (PEFT/LoRA) on LLMs', 'Load models in quantized formats (QLoRA)'],
      resources: [
        { title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course/' },
        { title: 'PEFT Library Documentation', url: 'https://huggingface.co/docs/peft' },
      ],
    },
    {
      topic: 'Reinforcement Learning Basics',
      tasks: ['Understand Markov Decision Processes', 'Learn Q-Learning and Policy Gradient algorithms', 'Train a gym environment agent'],
      resources: [
        { title: 'Hugging Face Deep RL Course', url: 'https://github.com/huggingface/deep-rl-class' },
        { title: 'OpenAI Spinning Up in Deep RL', url: 'https://spinningup.openai.com/en/latest/' },
      ],
    },
    {
      topic: 'Model Optimization & Inference',
      tasks: ['Understand quantization (INT8 vs FP16)', 'Run model pruning and knowledge distillation', 'Export PyTorch/TensorFlow models to ONNX/TensorRT'],
      resources: [
        { title: 'PyTorch Quantization guide', url: 'https://pytorch.org/docs/stable/quantization.html' },
        { title: 'ONNX Official Tutorials', url: 'https://onnx.ai/index.html' },
      ],
    },
    {
      topic: 'ML Pipeline Design (MLOps)',
      tasks: ['Learn workflow orchestration with Airflow or Prefect', 'Create reproducible ML pipelines using DVC', 'Deploy feature stores (Feast)'],
      resources: [
        { title: 'MLOps Zoomcamp free course', url: 'https://github.com/DataTalksClub/mlops-zoomcamp' },
        { title: 'DVC (Data Version Control) guides', url: 'https://dvc.org/doc/start' },
      ],
    },
    {
      topic: 'Model Versioning & Model Registries',
      tasks: ['Track experiments and run artifacts with MLflow', 'Learn how to register model versions', 'Implement CI/CD automation for model updates'],
      resources: [
        { title: 'MLflow Quickstart Guide', url: 'https://mlflow.org/docs/latest/index.html' },
        { title: 'GitHub Actions MLOps integration', url: 'https://github.com/features/actions' },
      ],
    },
    {
      topic: 'Cloud ML Services & Deployments',
      tasks: ['Use AWS SageMaker or GCP Vertex AI pipelines', 'Deploy endpoints with secure API Gateways', 'Configure IAM permissions and monitor cloud costs'],
      resources: [
        { title: 'AWS SageMaker Developer Guide', url: 'https://docs.aws.amazon.com/sagemaker/' },
        { title: 'Google Cloud Vertex AI guides', url: 'https://cloud.google.com/vertex-ai/docs' },
      ],
    },
    {
      topic: 'Docker for Machine Learning',
      tasks: ['Write Dockerfiles for GPU-enabled PyTorch containers', 'Optimize multi-stage Docker builds', 'Run ML applications locally via containers'],
      resources: [
        { title: 'Docker Official Guides', url: 'https://docs.docker.com/' },
        { title: 'NVIDIA Container Toolkit documentation', url: 'https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/index.html' },
      ],
    },
    {
      topic: 'CI/CD & Testing for ML Pipelines',
      tasks: ['Implement unit tests for ML models & data checks (Great Expectations)', 'Automate model training runs using GitHub Actions', 'Setup automated Docker image builds'],
      resources: [
        { title: 'Great Expectations Quickstart', url: 'https://greatexpectations.io/getting-started' },
        { title: 'Continuous Integration with GitHub Actions', url: 'https://docs.github.com/en/actions' },
      ],
    },
    {
      topic: 'ML System Design',
      tasks: ['Learn real-time vs batch inference design', 'Design scalable systems for high throughput recommendations', 'Design feedback loops for data drift detection'],
      resources: [
        { title: 'Designing Machine Learning Systems book', url: 'https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/' },
        { title: 'Chip Huyen ML System Design Syllabus', url: 'https://huyenchip.com/machine-learning-systems-design/' },
      ],
    },
    {
      topic: 'Capstone ML Project',
      tasks: ['Pick a project with complex data pipelines (text/images)', 'Implement experiment tracking, Docker packaging, and cloud deployment', 'Set up data drift monitoring and dashboards'],
      resources: [
        { title: 'MLOps Guide - End to End Project', url: 'https://github.com/features/actions' },
        { title: 'Streamlit for ML dashboards', url: 'https://docs.streamlit.io/' },
      ],
    },
  ],
  'Mobile Dev': [
    {
      topic: 'Mobile Development Setup & Dart',
      tasks: ['Install Flutter/Android Studio/Xcode tools', 'Learn Dart/JavaScript basic language features', 'Write command line Dart applications'],
      resources: [
        { title: 'Flutter Official Install Guide', url: 'https://docs.flutter.dev/get-started/install' },
        { title: 'Dart Language Tour', url: 'https://dart.dev/guides/language/language-tour' },
      ],
    },
    {
      topic: 'Flutter UI Components (Widgets)',
      tasks: ['Understand Stateless vs Stateful widgets', 'Master Container, Row, Column, ListView widgets', 'Build a static profile screen layout'],
      resources: [
        { title: 'Flutter Widget Catalog', url: 'https://docs.flutter.dev/reference/widgets' },
        { title: 'App Brewery Flutter Guide', url: 'https://www.udemy.com/course/flutter-bootcamp-with-dart/' },
      ],
    },
    {
      topic: 'Responsive Layouts & Themes',
      tasks: ['Use LayoutBuilder and MediaQuery for responsive designs', 'Design customized app themes (Light/Dark Mode)', 'Build customized buttons and inputs'],
      resources: [
        { title: 'Flutter Responsive Design guide', url: 'https://docs.flutter.dev/ui/layout/responsive' },
        { title: 'Material Design 3 Flutter Guide', url: 'https://docs.flutter.dev/ui/design/material' },
      ],
    },
    {
      topic: 'App Navigation & Routing',
      tasks: ['Understand Navigator 1.0 and basic Page Routes', 'Implement named routes and parameter passing', 'Learn GoRouter for advanced declarative routing'],
      resources: [
        { title: 'GoRouter package docs', url: 'https://pub.dev/packages/go_router' },
        { title: 'Flutter Navigation & Routing docs', url: 'https://docs.flutter.dev/ui/navigation' },
      ],
    },
    {
      topic: 'Interactive Forms & User Input',
      tasks: ['Handle text input with controllers and validators', 'Create custom form fields and switches', 'Build user registration forms'],
      resources: [
        { title: 'Flutter Forms Tutorial', url: 'https://docs.flutter.dev/cookbook/forms' },
        { title: 'Dart Package Input Utilities', url: 'https://pub.dev/packages/form_validator' },
      ],
    },
    {
      topic: 'State Management Basics (Provider)',
      tasks: ['Understand state lifecycles and rebuilding widgets', 'Implement Provider package for shared app states', 'Build a shopping cart mock app'],
      resources: [
        { title: 'Flutter State Management Intro', url: 'https://docs.flutter.dev/data-and-backend/state-mgmt/intro' },
        { title: 'Provider Package on Pub.dev', url: 'https://pub.dev/packages/provider' },
      ],
    },
    {
      topic: 'Advanced State Management (Riverpod/BLoC)',
      tasks: ['Learn Flutter BLoC pattern or Riverpod', 'Separate business logic from presentation layer', 'Build a reactive state management counter/timer app'],
      resources: [
        { title: 'Bloc State Management library', url: 'https://bloclibrary.dev/#/gettingstarted' },
        { title: 'Riverpod Documentation', url: 'https://riverpod.dev/' },
      ],
    },
    {
      topic: 'Fetching Data from REST APIs',
      tasks: ['Learn how to use Dio or http packages', 'Parse JSON data into typed Dart model classes', 'Build an app loading list data from a public API'],
      resources: [
        { title: 'Flutter Http Package Cookbook', url: 'https://docs.flutter.dev/cookbook/networking/fetch-data' },
        { title: 'QuickType JSON to Dart generator', url: 'https://quicktype.io/' },
      ],
    },
    {
      topic: 'Local Data Persistence',
      tasks: ['Store key-value pairs with Shared Preferences', 'Implement SQLite databases using sqflite/Hive', 'Build offline data caching mechanisms'],
      resources: [
        { title: 'sqflite database package', url: 'https://pub.dev/packages/sqflite' },
        { title: 'Hive database for local storage', url: 'https://docs.hivedb.dev/' },
      ],
    },
    {
      topic: 'Native Device Features',
      tasks: ['Access camera and galleries using image_picker', 'Fetch user GPS location coordinates using geolocator', 'Secure device biometric logins (Local Auth)'],
      resources: [
        { title: 'image_picker package', url: 'https://pub.dev/packages/image_picker' },
        { title: 'geolocator package', url: 'https://pub.dev/packages/geolocator' },
      ],
    },
    {
      topic: 'Animations & Custom Transitions',
      tasks: ['Understand Implicit Animations (AnimatedContainer, Hero)', 'Build Custom Page Transitions and custom Hero transitions', 'Learn Lottie for JSON animations'],
      resources: [
        { title: 'Flutter Animation Intro', url: 'https://docs.flutter.dev/ui/animations' },
        { title: 'Lottie Animations for Flutter', url: 'https://pub.dev/packages/lottie' },
      ],
    },
    {
      topic: 'Push Notifications & Firebase',
      tasks: ['Integrate Firebase Core and Firestore SDKs', 'Setup Firebase Cloud Messaging (FCM) push notifications', 'Configure target Android/iOS client IDs'],
      resources: [
        { title: 'Firebase Flutter Docs', url: 'https://firebase.google.com/docs/flutter/setup' },
        { title: 'FCM Push Notification Tutorial', url: 'https://firebase.google.com/docs/cloud-messaging/flutter/client' },
      ],
    },
    {
      topic: 'Authentication & Secure Storage',
      tasks: ['Implement Email & Google Logins using Firebase Auth', 'Store sensitive tokens securely with flutter_secure_storage', 'Build app lock/logout logic'],
      resources: [
        { title: 'Firebase Auth package', url: 'https://pub.dev/packages/firebase_auth' },
        { title: 'Flutter Secure Storage', url: 'https://pub.dev/packages/flutter_secure_storage' },
      ],
    },
    {
      topic: 'Testing Mobile Applications',
      tasks: ['Write unit tests for business logic rules', 'Write widget tests for checking UI behaviors', 'Write integration tests using Integration Test package'],
      resources: [
        { title: 'Testing Flutter Apps Cookbook', url: 'https://docs.flutter.dev/cookbook/testing' },
        { title: 'Flutter Widget Testing Docs', url: 'https://docs.flutter.dev/cookbook/testing/unit/introduction' },
      ],
    },
    {
      topic: 'App Performance & Profiling',
      tasks: ['Use DevTools to analyze performance bottlenecks', 'Avoid rebuilds using const widgets', 'Optimize image loaders and list view layouts'],
      resources: [
        { title: 'Flutter Profiling guide', url: 'https://docs.flutter.dev/perf/ui-performance' },
        { title: 'Flutter DevTools overview', url: 'https://docs.flutter.dev/tools/devtools/overview' },
      ],
    },
    {
      topic: 'App Store & Google Play Deployment',
      tasks: ['Configure Android launcher icons and package names', 'Setup iOS App Store provisioning profiles', 'Build APK/AAB bundle releases'],
      resources: [
        { title: 'Flutter Android Deployment guide', url: 'https://docs.flutter.dev/deployment/android' },
        { title: 'Flutter iOS Deployment guide', url: 'https://docs.flutter.dev/deployment/ios' },
      ],
    },
  ],
  'DevOps': [
    {
      topic: 'Linux Fundamentals & CLI',
      tasks: ['Learn essential terminal commands (ls, cd, grep, awk)', 'Understand file systems, users, groups, and permissions', 'Manage system logs and processes'],
      resources: [
        { title: 'Linux Journey Tutorials', url: 'https://linuxjourney.com/' },
        { title: 'OverTheWire Wargames: Bandit', url: 'https://overthewire.org/wargames/bandit/' },
      ],
    },
    {
      topic: 'Bash Scripting & Automation',
      tasks: ['Understand loops, conditions, and variables in Bash', 'Write scripts to automate backups and file cleanup', 'Handle user inputs and exit codes'],
      resources: [
        { title: 'Bash scripting for beginners', url: 'https://www.freecodecamp.org/news/bash-scripting-tutorial-for-beginners/' },
        { title: 'ShellCheck Script Validator', url: 'https://www.shellcheck.net/' },
      ],
    },
    {
      topic: 'Networking & Protocols',
      tasks: ['Understand TCP/IP, DNS, and HTTP/S protocols', 'Configure SSH keys and understand port forwarding', 'Learn tools like curl, netstat, dig, and nmap'],
      resources: [
        { title: 'Computer Networking Basics', url: 'https://www.freecodecamp.org/news/computer-networking-course-for-beginners/' },
        { title: 'MDN Web Docs HTTP Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
      ],
    },
    {
      topic: 'Git & Collaboration Workflows',
      tasks: ['Understand Git merges vs rebase', 'Work with remote repos and handle merge conflicts', 'Define branching strategies (GitFlow)'],
      resources: [
        { title: 'Atlassian Git Tutorials', url: 'https://www.atlassian.com/git' },
        { title: 'Git branching game', url: 'https://learngitbranching.js.org/' },
      ],
    },
    {
      topic: 'Python or Go for DevOps',
      tasks: ['Write Python/Go scripts to parse logs', 'Use APIs and interact with filesystems using scripts', 'Build custom automation tools'],
      resources: [
        { title: 'Python for DevOps Guide', url: 'https://realpython.com/python-for-devops/' },
        { title: 'Go by Example', url: 'https://gobyexample.com/' },
      ],
    },
    {
      topic: 'Containerization Basics (Docker)',
      tasks: ['Understand containerization vs virtualization', 'Write optimized Dockerfiles', 'Manage Docker containers, networks, and volumes'],
      resources: [
        { title: 'Docker Official Getting Started', url: 'https://docs.docker.com/get-started/' },
        { title: 'Docker Labs on Katacoda/GitHub', url: 'https://github.com/docker/labs' },
      ],
    },
    {
      topic: 'Docker Compose & Multi-Container Apps',
      tasks: ['Define services in docker-compose.yml', 'Connect databases to web application containers', 'Configure environment variables inside containers'],
      resources: [
        { title: 'Docker Compose Overview', url: 'https://docs.docker.com/compose/' },
        { title: 'Compose sample files', url: 'https://github.com/docker/awesome-compose' },
      ],
    },
    {
      topic: 'CI/CD Core Concepts & GitHub Actions',
      tasks: ['Define continuous integration and continuous delivery', 'Create simple GitHub actions workflows', 'Build and run tests automatically on code push'],
      resources: [
        { title: 'GitHub Actions Quickstart', url: 'https://docs.github.com/en/actions/quickstart' },
        { title: 'CI/CD Best Practices', url: 'https://www.redhat.com/en/topics/devops/what-is-ci-cd' },
      ],
    },
    {
      topic: 'Advanced CI/CD (Jenkins/GitLab)',
      tasks: ['Configure self-hosted runners', 'Setup pipeline triggers and artifact caching', 'Implement automated rollback states'],
      resources: [
        { title: 'Jenkins Pipeline Tutorial', url: 'https://www.jenkins.io/doc/book/pipeline/' },
        { title: 'GitLab CI/CD Guides', url: 'https://docs.gitlab.com/ee/ci/' },
      ],
    },
    {
      topic: 'Infrastructure as Code (IaC) with Terraform',
      tasks: ['Understand declarative vs imperative IaC', 'Write basic Terraform configuration files', 'Understand Terraform state management'],
      resources: [
        { title: 'Terraform Tutorials on HashiCorp Learn', url: 'https://developer.hashicorp.com/terraform/tutorials' },
        { title: 'Terraform Registry reference', url: 'https://registry.terraform.io/' },
      ],
    },
    {
      topic: 'Cloud Computing (AWS/GCP)',
      tasks: ['Provision instances (EC2/Compute Engine)', 'Configure virtual private networks (VPCs) and firewalls', 'Setup simple storage buckets (S3/Cloud Storage)'],
      resources: [
        { title: 'AWS Skill Builder', url: 'https://skillbuilder.aws/' },
        { title: 'GCP Free Tier Overview', url: 'https://cloud.google.com/free' },
      ],
    },
    {
      topic: 'Cloud IAM & Policies',
      tasks: ['Understand Role-Based Access Control (RBAC)', 'Configure cloud IAM user accounts and policies', 'Implement Least Privilege security policies'],
      resources: [
        { title: 'AWS IAM Guide', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html' },
        { title: 'GCP IAM Docs', url: 'https://cloud.google.com/iam/docs/overview' },
      ],
    },
    {
      topic: 'Kubernetes Architecture & Basics',
      tasks: ['Understand Pods, Services, and Deployments', 'Setup a local K8s cluster (Minikube or Kind)', 'Run basic kubectl commands'],
      resources: [
        { title: 'Kubernetes Official Interactive tutorials', url: 'https://kubernetes.io/docs/tutorials/' },
        { title: 'Interactive K8s labs', url: 'https://killercoda.com/playgrounds' },
      ],
    },
    {
      topic: 'Deploying Applications to Kubernetes',
      tasks: ['Write deployment.yaml and service.yaml configs', 'Configure persistent volumes and configmaps', 'Expose applications using Ingress controllers'],
      resources: [
        { title: 'Kubernetes Deployment docs', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/' },
        { title: 'Ingress Guide', url: 'https://kubernetes.io/docs/concepts/services-networking/ingress/' },
      ],
    },
    {
      topic: 'Configuration Management (Ansible)',
      tasks: ['Understand agentless configuration management', 'Write Ansible playbooks', 'Manage inventory hosts and variables'],
      resources: [
        { title: 'Ansible Quickstart guide', url: 'https://docs.ansible.com/ansible/latest/getting_started/index.html' },
        { title: 'Ansible Galaxy templates', url: 'https://galaxy.ansible.com/' },
      ],
    },
    {
      topic: 'Monitoring & Logging (Prometheus/Grafana)',
      tasks: ['Configure Prometheus exporters to pull system metrics', 'Create Grafana dashboards to monitor host CPU/Memory', 'Query logs using ELK Stack or Loki'],
      resources: [
        { title: 'Prometheus Getting Started', url: 'https://prometheus.io/docs/introduction/first_steps/' },
        { title: 'Grafana Tutorials', url: 'https://grafana.com/tutorials/' },
      ],
    },
    {
      topic: 'Security Best Practices & DevSecOps',
      tasks: ['Scan container images for vulnerabilities (Trivy)', 'Implement secrets scanning in code (git-secrets)', 'Understand SSL certificate automation with Let\'s Encrypt'],
      resources: [
        { title: 'Trivy Scanner Documentation', url: 'https://aquasecurity.github.io/trivy/latest/' },
        { title: 'DevSecOps Guide', url: 'https://www.devsecops.org/' },
      ],
    },
    {
      topic: 'Disaster Recovery & Backup Strategies',
      tasks: ['Implement automated database backup cronjobs', 'Design multi-region failovers', 'Document standard operating procedures (SOPs) for outages'],
      resources: [
        { title: 'Disaster Recovery Planning guide', url: 'https://aws.amazon.com/blogs/architecture/disaster-recovery-dr-architecture-on-aws-part-i-strategies-for-recovery-in-the-cloud/' },
        { title: 'Cron job tutorials', url: 'https://crontab.guru/' },
      ],
    },
  ],
};

export function generateRoadmap(answers: QuizAnswers): RoadmapData {
  const { skills, dreamJob, targetCompanies, year, learningStyle } = answers;

  const roleDetails = getRoleDetails(dreamJob);
  const yearMultiplier = getYearMultiplier(year);
  const missingSkills = roleDetails.skills.filter((s) => !skills.includes(s));

  // Base weeks
  const baseWeeks = roleDetails.baseWeeks;
  let adjustedWeeks = Math.round(baseWeeks * yearMultiplier);

  // Adjust weeks based on skills already acquired
  const totalSkills = roleDetails.skills.length;
  const missingSkillsCount = missingSkills.length;
  const knownFraction = (totalSkills - missingSkillsCount) / totalSkills;
  
  // Reduce up to 30% if they already know some of the skills
  adjustedWeeks = Math.max(6, Math.round(adjustedWeeks * (1 - 0.3 * knownFraction)));

  const jobTopics = topicsPerRole[dreamJob] || topicsPerRole['Full Stack Dev'];
  const numTopics = jobTopics.length;

  const weeklyPlan: RoadmapWeek[] = [];

  for (let w = 1; w <= adjustedWeeks; w++) {
    // Map adjusted weeks to topics list index
    const startIndex = Math.floor(((w - 1) / adjustedWeeks) * numTopics);
    const endIndex = Math.floor((w / adjustedWeeks) * numTopics);

    let selectedTopics = jobTopics.slice(startIndex, endIndex);
    if (selectedTopics.length === 0 && jobTopics[startIndex]) {
      selectedTopics = [jobTopics[startIndex]];
    }

    const topicTitle = selectedTopics.map((t) => t.topic).join(' & ');
    let tasks = selectedTopics.flatMap((t) => t.tasks);

    // Limit tasks to max 3 per week
    if (tasks.length > 3) {
      tasks = tasks.slice(0, 3);
    } else if (tasks.length === 0) {
      tasks = [`Study ${topicTitle} core concepts`, `Complete practical lab exercises on ${topicTitle}`];
    }

    // Insert company targeted tasks in appropriate weeks
    if (targetCompanies && targetCompanies.length > 0 && (w === adjustedWeeks || w % 3 === 0)) {
      const company = targetCompanies[w % targetCompanies.length];
      tasks.push(`Review ${company} interview questions on these topics to align with real job requirements`);
    }

    // Add hands-on project tasks for projects learning style
    if (learningStyle === 'Projects') {
      tasks.push(`Build a mini project applying the skills learned in ${selectedTopics[0]?.topic || topicTitle}`);
    }

    let resources = selectedTopics.flatMap((t) => t.resources);

    // Filter/order resources based on preferred learning style
    if (learningStyle === 'Videos') {
      resources = [...resources].sort((a, b) => {
        const aVal = a.title.toLowerCase().includes('video') || a.title.toLowerCase().includes('youtube') || a.title.toLowerCase().includes('course') || a.title.toLowerCase().includes('bootcamp') ? 0 : 1;
        const bVal = b.title.toLowerCase().includes('video') || b.title.toLowerCase().includes('youtube') || b.title.toLowerCase().includes('course') || b.title.toLowerCase().includes('bootcamp') ? 0 : 1;
        return aVal - bVal;
      });
    } else if (learningStyle === 'Reading') {
      resources = [...resources].sort((a, b) => {
        const aVal = a.title.toLowerCase().includes('doc') || a.title.toLowerCase().includes('guide') || a.title.toLowerCase().includes('book') || a.title.toLowerCase().includes('handbook') ? 0 : 1;
        const bVal = b.title.toLowerCase().includes('doc') || b.title.toLowerCase().includes('guide') || b.title.toLowerCase().includes('book') || b.title.toLowerCase().includes('handbook') ? 0 : 1;
        return aVal - bVal;
      });
    }

    // Limit to max 2 resources
    if (resources.length > 2) {
      resources = resources.slice(0, 2);
    } else if (resources.length === 0) {
      resources = [
        { title: 'YouTube Tutorial', url: 'https://youtube.com' },
        { title: 'freeCodeCamp Course', url: 'https://freecodecamp.org' },
      ];
    }

    weeklyPlan.push({
      week: w,
      topic: topicTitle,
      tasks,
      resources,
    });
  }

  return {
    missingSkills: missingSkills.length > 0 ? missingSkills : ['Advanced Topics & Specializations'],
    estimatedWeeks: adjustedWeeks,
    weeklyPlan,
  };
}
