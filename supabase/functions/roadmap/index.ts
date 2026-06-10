import "jsr:@supabase/functions-js/edge-runtime.d.ts";

interface QuizAnswers {
  skills: string[];
  dreamJob: string;
  hoursPerWeek: number;
  targetCompanies: string[];
  year: string;
  learningStyle: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY")!;

function getYearMultiplier(year: string): number {
  switch (year) {
    case "1st": return 1.5;
    case "2nd": return 1.2;
    case "3rd": return 1.0;
    case "4th": return 0.8;
    case "Working": return 0.6;
    default: return 1.0;
  }
}

function getRoleDetails(dreamJob: string): { skills: string[]; baseWeeks: number } {
  const roles: Record<string, { skills: string[]; baseWeeks: number }> = {
    "Full Stack Dev": {
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "SQL", "Git", "REST APIs", "TypeScript"],
      baseWeeks: 16,
    },
    "Data Scientist": {
      skills: ["Python", "Statistics", "SQL", "Pandas", "Machine Learning", "Data Visualization", "NumPy", "Scikit-learn"],
      baseWeeks: 20,
    },
    "ML Engineer": {
      skills: ["Python", "TensorFlow/PyTorch", "Deep Learning", "MLOps", "Statistics", "Data Structures", "Algorithms", "Cloud"],
      baseWeeks: 22,
    },
    "Mobile Dev": {
      skills: ["Dart/Flutter", "React Native or Swift/Kotlin", "Mobile UI/UX", "State Management", "APIs", "Git", "App Store Deployment"],
      baseWeeks: 16,
    },
    "DevOps": {
      skills: ["Linux", "Docker", "Kubernetes", "CI/CD", "AWS/GCP", "Terraform", "Networking", "Scripting"],
      baseWeeks: 18,
    },
  };
  return roles[dreamJob] || roles["Full Stack Dev"];
}

async function generateRoadmapWithAI(answers: QuizAnswers) {
  const { skills, dreamJob, hoursPerWeek, targetCompanies, year, learningStyle } = answers;

  const roleDetails = getRoleDetails(dreamJob);
  const yearMultiplier = getYearMultiplier(year);
  const adjustedWeeks = Math.round(roleDetails.baseWeeks * yearMultiplier);
  const missingSkills = roleDetails.skills.filter((s) => !skills.includes(s));

  const prompt = `You are an expert career counselor for Indian engineering students. Generate a ${adjustedWeeks}-week personalized learning roadmap for a ${year} year student who wants to become a ${dreamJob}.

Current skills: ${skills.join(", ") || "None"}
Missing skills to learn: ${missingSkills.join(", ")}
Hours per week available: ${hoursPerWeek}
Target companies: ${targetCompanies.join(", ")}
Preferred learning style: ${learningStyle}

Generate a JSON response with this exact structure:
{
  "missingSkills": string[],
  "estimatedWeeks": number,
  "weeklyPlan": [
    {
      "week": number,
      "topic": string,
      "tasks": string[],
      "resources": [{ "title": string, "url": string }]
    }
  ]
}

Include 2-3 tasks per week and 2 free learning resources per week. Focus on practical skills for ${dreamJob}. Resources should be free (YouTube, freeCodeCamp, Coursera audit, MDN, etc).`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error("AI generation failed:", e);
  }

  return generateFallbackRoadmap(answers, missingSkills, adjustedWeeks);
}

function generateFallbackRoadmap(answers: QuizAnswers, missingSkills: string[], weeks: number) {
  const { dreamJob, year } = answers;

  const weeklyPlan = [];
  const topicsPerRole: Record<string, string[]> = {
    "Full Stack Dev": [
      "HTML & CSS Foundations", "JavaScript Essentials", "React Fundamentals",
      "Node.js & Express", "Database Design with SQL", "RESTful APIs",
      "Authentication & Security", "TypeScript", "Testing & Debugging",
      "Advanced React Patterns", "State Management", "Deployment & DevOps"
    ],
    "Data Scientist": [
      "Python for Data Science", "Statistics & Probability", "NumPy & Pandas",
      "Data Visualization", "SQL for Data Analysis", "Exploratory Data Analysis",
      "Machine Learning Basics", "Supervised Learning", "Unsupervised Learning",
      "Model Evaluation", "Feature Engineering", "Real-World Projects"
    ],
    "ML Engineer": [
      "Python Advanced", "Mathematics for ML", "Neural Networks Basics",
      "TensorFlow/PyTorch", "Computer Vision", "NLP Fundamentals",
      "Deep Learning Architectures", "Model Optimization", "MLOps Basics",
      "Cloud ML Services", "Deployment Strategies", "Advanced Projects"
    ],
    "Mobile Dev": [
      "Dart/Flutter Basics", "Flutter UI Components", "State Management",
      "API Integration", "Local Storage", "Authentication",
      "Camera & Sensors", "Push Notifications", "App Navigation",
      "Testing Flutter Apps", "Performance Optimization", "App Store Deployment"
    ],
    "DevOps": [
      "Linux Fundamentals", "Shell Scripting", "Git Version Control",
      "Docker Containers", "Kubernetes Basics", "CI/CD Pipelines",
      "AWS/GCP Fundamentals", "Infrastructure as Code", "Monitoring & Logging",
      "Security Best Practices", "Microservices", "Production Deployment"
    ],
  };

  const topics = topicsPerRole[dreamJob] || topicsPerRole["Full Stack Dev"];
  const numWeeks = Math.min(weeks, topics.length);

  const resourcesPerTopic: Record<string, { title: string; url: string }[]> = {
    "HTML & CSS Foundations": [
      { title: "freeCodeCamp Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" },
      { title: "MDN HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
    ],
    "JavaScript Essentials": [
      { title: "JavaScript.info", url: "https://javascript.info/" },
      { title: "freeCodeCamp JS Algorithms", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
    ],
    "React Fundamentals": [
      { title: "React Official Docs", url: "https://react.dev/learn" },
      { title: "Scrimba React Course", url: "https://scrimba.com/learn/learnreact" },
    ],
  };

  for (let i = 0; i < numWeeks; i++) {
    weeklyPlan.push({
      week: i + 1,
      topic: topics[i] || `Week ${i + 1} Topics`,
      tasks: [
        `Study ${topics[i]} fundamentals`,
        `Build a mini project using ${topics[i]}`,
        `Complete exercises and practice problems`,
      ],
      resources: resourcesPerTopic[topics[i]] || [
        { title: "YouTube Tutorial", url: "https://youtube.com" },
        { title: "freeCodeCamp", url: "https://freecodecamp.org" },
      ],
    });
  }

  return {
    missingSkills,
    estimatedWeeks: weeks,
    weeklyPlan,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const answers: QuizAnswers = await req.json();
    const roadmap = await generateRoadmapWithAI(answers);

    return new Response(JSON.stringify(roadmap), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
