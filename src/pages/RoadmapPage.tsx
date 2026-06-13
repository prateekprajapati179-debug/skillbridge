import { useState, useEffect } from 'react';
import { Clock, ExternalLink, RefreshCw, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import type { RoadmapData, QuizAnswers, Page } from '../types';
import { MOCK_ROADMAP } from '../data';
import { generateRoadmap } from '../utils/roadmapGenerator';

interface RoadmapPageProps {
  quizAnswers: QuizAnswers | null;
  onNavigate: (page: Page) => void;
}

const SKILL_COLORS = [
  'bg-blue-100 text-blue-700 border-blue-200',
  'bg-green-100 text-green-700 border-green-200',
  'bg-orange-100 text-orange-700 border-orange-200',
  'bg-pink-100 text-pink-700 border-pink-200',
  'bg-teal-100 text-teal-700 border-teal-200',
];

export default function RoadmapPage({ quizAnswers, onNavigate }: RoadmapPageProps) {
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(0);

  useEffect(() => {
    if (!quizAnswers) {
      setRoadmap(MOCK_ROADMAP);
      setLoading(false);
      return;
    }
    fetchRoadmap();
  }, [quizAnswers]);

  const fetchRoadmap = async () => {
    setLoading(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/roadmap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseKey}`,
          Apikey: supabaseKey,
        },
        body: JSON.stringify(quizAnswers),
      });
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setRoadmap(data);
    } catch {
      if (quizAnswers) {
        setRoadmap(generateRoadmap(quizAnswers));
      } else {
        setRoadmap(MOCK_ROADMAP);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-100 flex items-center justify-center animate-pulse">
            <Sparkles className="w-8 h-8 text-indigo-500" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Generating Your Roadmap...</h2>
          <p className="text-slate-500 dark:text-slate-300">Our AI is analyzing your profile and creating a personalized plan.</p>
        </div>
      </div>
    );
  }

  if (!roadmap) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4" />
            AI-Generated Personalized Roadmap
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {quizAnswers ? `Your ${quizAnswers.dreamJob} Roadmap` : 'Your Personalized Roadmap'}
          </h1>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 dark:bg-white/5 rounded-lg px-4 py-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span className="text-sm">Job-ready in <strong>{roadmap.estimatedWeeks} weeks</strong></span>
            </div>
            <button
              onClick={fetchRoadmap}
              className="flex items-center gap-2 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg px-4 py-2 text-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </button>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 mb-8 shadow-sm">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">Skills You Need to Learn</h2>
          <div className="flex flex-wrap gap-2">
            {roadmap.missingSkills.map((skill, i) => (
              <span
                key={skill}
                className={`px-4 py-2 rounded-xl border text-sm font-medium ${SKILL_COLORS[i % SKILL_COLORS.length]}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">Week-by-Week Learning Plan</h2>
          <div className="space-y-4">
            {roadmap.weeklyPlan.map((week, i) => (
              <div
                key={week.week}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setExpandedWeek(expandedWeek === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {week.week}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">Week {week.week}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-300">{week.topic}</div>
                    </div>
                  </div>
                  {expandedWeek === i ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {expandedWeek === i && (
                  <div className="px-6 pb-6 border-t border-slate-50">
                    <div className="pt-4 grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Tasks</div>
                        <ul className="space-y-2">
                          {week.tasks.map((task) => (
                            <li key={task} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Free Resources</div>
                        <div className="space-y-2">
                          {week.resources.map((res) => (
                            <a
                              key={res.title}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-500 hover:underline"
                            >
                              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                              {res.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900 border border-indigo-100 dark:border-indigo-700 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Practice DSA for your target companies</div>
            <div className="text-sm text-slate-500 dark:text-slate-300">Get company-specific interview questions with solutions</div>
          </div>
          <button
            onClick={() => onNavigate('dsa')}
            className="flex-shrink-0 px-6 py-3 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-400 transition-colors"
          >
            Go to DSA Track
          </button>
        </div>
      </div>
    </div>
  );
}
