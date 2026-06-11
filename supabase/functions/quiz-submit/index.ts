import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface QuizAnswers {
  skills: string[];
  dreamJob: string;
  hoursPerWeek: number;
  targetCompanies: string[];
  year: string;
  learningStyle: string;
  topicInterests?: string[];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { quizAnswers } = await req.json();

    // Validate quiz answers
    if (!quizAnswers || !quizAnswers.skills || !quizAnswers.dreamJob) {
      return new Response(
        JSON.stringify({ error: "Invalid quiz answers" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Store quiz response (in production, save to Supabase database)
    const quizResponse = {
      id: crypto.randomUUID(),
      userId: "user-1", // In production, get from auth
      answers: quizAnswers,
      topicInterests: quizAnswers.topicInterests || [],
      completedAt: new Date().toISOString(),
    };

    // Generate personalized roadmap based on dream job and topic interests
    const roadmap = generateRoadmap(quizAnswers);

    return new Response(
      JSON.stringify({
        success: true,
        quizResponse,
        roadmap,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});

function generateRoadmap(answers: QuizAnswers) {
  const jobRoadmaps: Record<string, any> = {
    "Full Stack Dev": {
      missingSkills: ["React", "Node.js", "SQL", "DevOps", "System Design"],
      estimatedWeeks: 16,
      weeklyPlan: [
        {
          week: 1,
          topic: "Frontend Fundamentals",
          tasks: ["HTML5 semantic tags", "CSS Flexbox/Grid", "Responsive design"],
          resources: [
            { title: "MDN Web Docs", url: "https://developer.mozilla.org/" },
            { title: "CSS Tricks", url: "https://css-tricks.com/" },
          ],
        },
        {
          week: 2,
          topic: "JavaScript ES6+",
          tasks: ["Arrow functions", "Promises/Async-await", "DOM manipulation"],
          resources: [
            { title: "JavaScript.info", url: "https://javascript.info/" },
            { title: "freeCodeCamp JS", url: "https://freecodecamp.org/" },
          ],
        },
        {
          week: 3,
          topic: "React Basics",
          tasks: ["Components & Props", "Hooks (useState, useEffect)", "Build a todo app"],
          resources: [
            { title: "React Docs", url: "https://react.dev/learn" },
            { title: "React YouTube", url: "https://youtube.com/" },
          ],
        },
        {
          week: 4,
          topic: "Backend with Node.js",
          tasks: ["Express.js setup", "REST APIs", "Middleware concepts"],
          resources: [
            { title: "Node.js Docs", url: "https://nodejs.org/" },
            { title: "Express Guide", url: "https://expressjs.com/" },
          ],
        },
        {
          week: 5,
          topic: "Database Design",
          tasks: ["SQL basics", "PostgreSQL setup", "Joins & Aggregations"],
          resources: [
            { title: "SQLZoo", url: "https://sqlzoo.net/" },
            { title: "PostgreSQL Tutorial", url: "https://postgresql.org/" },
          ],
        },
        {
          week: 6,
          topic: "TypeScript",
          tasks: ["Type annotations", "Interfaces & Generics", "Convert JS to TS"],
          resources: [
            { title: "TypeScript Handbook", url: "https://typescriptlang.org/" },
            { title: "TS Deep Dive", url: "https://basarat.gitbook.io/" },
          ],
        },
      ],
    },
    "Data Scientist": {
      missingSkills: ["Python Data Science", "Statistics", "Machine Learning", "Data Visualization"],
      estimatedWeeks: 12,
      weeklyPlan: [
        {
          week: 1,
          topic: "Python Fundamentals",
          tasks: ["Data types & structures", "Functions & OOP", "File handling"],
          resources: [
            { title: "Python.org Docs", url: "https://python.org/" },
            { title: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com/" },
          ],
        },
        {
          week: 2,
          topic: "NumPy & Pandas",
          tasks: ["NumPy arrays", "Pandas DataFrames", "Data cleaning"],
          resources: [
            { title: "NumPy Docs", url: "https://numpy.org/" },
            { title: "Pandas Docs", url: "https://pandas.pydata.org/" },
          ],
        },
        {
          week: 3,
          topic: "Statistics & Probability",
          tasks: ["Distributions", "Hypothesis testing", "Correlation analysis"],
          resources: [
            { title: "StatQuest", url: "https://statquest.org/" },
            { title: "Khan Academy Stats", url: "https://khanacademy.org/" },
          ],
        },
        {
          week: 4,
          topic: "Machine Learning Basics",
          tasks: ["Linear Regression", "Logistic Regression", "Decision Trees"],
          resources: [
            { title: "Scikit-learn Docs", url: "https://scikit-learn.org/" },
            { title: "Andrew Ng ML Course", url: "https://coursera.org/" },
          ],
        },
      ],
    },
    "ML Engineer": {
      missingSkills: ["Deep Learning", "TensorFlow/PyTorch", "Model Deployment", "MLOps"],
      estimatedWeeks: 14,
      weeklyPlan: [
        {
          week: 1,
          topic: "Neural Networks Fundamentals",
          tasks: ["Perceptrons", "Backpropagation", "Activation functions"],
          resources: [
            { title: "3Blue1Brown Neural Networks", url: "https://youtube.com/" },
            { title: "Stanford CS231N", url: "https://cs231n.stanford.edu/" },
          ],
        },
        {
          week: 2,
          topic: "Deep Learning Frameworks",
          tasks: ["TensorFlow basics", "PyTorch tensors", "Model building"],
          resources: [
            { title: "TensorFlow Docs", url: "https://tensorflow.org/" },
            { title: "PyTorch Tutorials", url: "https://pytorch.org/" },
          ],
        },
      ],
    },
  };

  return jobRoadmaps[answers.dreamJob] || jobRoadmaps["Full Stack Dev"];
}
