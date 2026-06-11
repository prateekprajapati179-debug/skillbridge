import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RoadmapRequest {
  topicInterests: string[];
  answers: {
    hoursPerWeek: number;
    year: string;
    learningStyle: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { topicInterests, answers } = await req.json() as RoadmapRequest;

    if (!topicInterests || topicInterests.length === 0) {
      return new Response(
        JSON.stringify({ error: "No topic interests provided" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Generate topic-specific roadmaps
    const roadmaps = topicInterests.map((topic) => ({
      topic,
      roadmap: generateTopicRoadmap(topic, answers),
    }));

    return new Response(
      JSON.stringify({
        success: true,
        roadmaps,
        personalizationNotes: generatePersonalizationNotes(answers),
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

function generateTopicRoadmap(topic: string, answers: any) {
  const topicRoadmaps: Record<string, any> = {
    "data-science": {
      title: "Data Science Fundamentals",
      missingSkills: ["Python", "Statistics", "SQL", "Data Visualization"],
      estimatedWeeks: 12,
      weeklyPlan: [
        {
          week: 1,
          topic: "Python for Data Science",
          tasks: ["NumPy basics", "Pandas DataFrames", "Data loading & cleaning"],
          resources: [
            { title: "NumPy Tutorial", url: "https://numpy.org/doc/" },
            { title: "Pandas Getting Started", url: "https://pandas.pydata.org/docs/getting_started/" },
          ],
        },
        {
          week: 2,
          topic: "Statistics Essentials",
          tasks: ["Distributions", "Hypothesis testing", "Correlation & Causation"],
          resources: [
            { title: "StatQuest with Josh Starmer", url: "https://www.youtube.com/user/joshstarmer" },
            { title: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability" },
          ],
        },
        {
          week: 3,
          topic: "SQL for Data Analysis",
          tasks: ["SELECT & WHERE", "JOINs", "Aggregations & GROUP BY"],
          resources: [
            { title: "SQLZoo", url: "https://sqlzoo.net/" },
            { title: "Mode Analytics SQL Tutorial", url: "https://mode.com/sql-tutorial/" },
          ],
        },
        {
          week: 4,
          topic: "Data Visualization",
          tasks: ["Matplotlib basics", "Seaborn plots", "Interactive dashboards"],
          resources: [
            { title: "Matplotlib Documentation", url: "https://matplotlib.org/" },
            { title: "Seaborn Gallery", url: "https://seaborn.pydata.org/examples.html" },
          ],
        },
      ],
    },
    "ml": {
      title: "Machine Learning Engineering",
      missingSkills: ["Supervised Learning", "Unsupervised Learning", "Deep Learning", "Model Deployment"],
      estimatedWeeks: 14,
      weeklyPlan: [
        {
          week: 1,
          topic: "ML Fundamentals",
          tasks: ["Train/test split", "Feature scaling", "Cross-validation"],
          resources: [
            { title: "Scikit-learn Guide", url: "https://scikit-learn.org/stable/user_guide.html" },
            { title: "Andrew Ng ML Course", url: "https://www.coursera.org/learn/machine-learning" },
          ],
        },
        {
          week: 2,
          topic: "Supervised Learning",
          tasks: ["Linear/Logistic Regression", "Decision Trees", "Ensemble methods"],
          resources: [
            { title: "Scikit-learn Supervised Learning", url: "https://scikit-learn.org/stable/supervised_learning.html" },
          ],
        },
      ],
    },
    "web-dev": {
      title: "Full Stack Web Development",
      missingSkills: ["Frontend", "Backend", "Databases", "Deployment"],
      estimatedWeeks: 16,
      weeklyPlan: [
        {
          week: 1,
          topic: "Web Fundamentals",
          tasks: ["HTML5 semantics", "CSS Grid & Flexbox", "Responsive design"],
          resources: [
            { title: "MDN Web Docs", url: "https://developer.mozilla.org/" },
            { title: "Web Dev for Beginners", url: "https://github.com/microsoft/Web-Dev-For-Beginners" },
          ],
        },
        {
          week: 2,
          topic: "JavaScript Mastery",
          tasks: ["ES6+ features", "DOM manipulation", "Async programming"],
          resources: [
            { title: "JavaScript.info", url: "https://javascript.info/" },
            { title: "You Don't Know JS Yet", url: "https://github.com/getify/You-Dont-Know-JS" },
          ],
        },
      ],
    },
    "mobile-dev": {
      title: "Mobile App Development",
      missingSkills: ["React Native/Flutter", "Mobile UI", "Performance Optimization"],
      estimatedWeeks: 12,
      weeklyPlan: [
        {
          week: 1,
          topic: "Mobile Fundamentals",
          tasks: ["Platform overview", "UI/UX basics", "Mobile-first design"],
          resources: [
            { title: "Google Mobile Playbook", url: "https://www.thinkwithgoogle.com/intl/en-us/future-of-marketing/" },
          ],
        },
      ],
    },
    "devops": {
      title: "Cloud & DevOps Engineering",
      missingSkills: ["Docker", "Kubernetes", "CI/CD", "Cloud Platforms"],
      estimatedWeeks: 10,
      weeklyPlan: [
        {
          week: 1,
          topic: "Containerization",
          tasks: ["Docker basics", "Images & containers", "Docker Compose"],
          resources: [
            { title: "Docker Documentation", url: "https://docs.docker.com/" },
          ],
        },
      ],
    },
    "system-design": {
      title: "System Design & Architecture",
      missingSkills: ["Scalability", "Distributed Systems", "Database Design", "Load Balancing"],
      estimatedWeeks: 8,
      weeklyPlan: [
        {
          week: 1,
          topic: "System Design Basics",
          tasks: ["Scalability concepts", "Load balancing", "Caching strategies"],
          resources: [
            { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
          ],
        },
      ],
    },
  };

  return topicRoadmaps[topic] || topicRoadmaps["web-dev"];
}

function generatePersonalizationNotes(answers: any): string {
  const hoursPerWeek = answers.hoursPerWeek || 15;
  const year = answers.year || "2nd";
  const style = answers.learningStyle || "All";

  let notes = `📌 Personalized for you:\n`;
  notes += `⏱️ ${hoursPerWeek} hours/week available\n`;
  notes += `📚 Learning style: ${style}\n`;
  notes += `🎓 Year: ${year}\n\n`;
  notes += `💡 Recommendation: With ${hoursPerWeek} hours/week, you can complete a track in 3-4 months. `;
  notes += `Consistency matters more than quantity - better to code 1 hour daily than 7 hours once a week!`;

  return notes;
}
