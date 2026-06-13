import { useState } from 'react';
import { ArrowRight, Brain, Target, Map, Code, BookOpen, Sparkles, CheckCircle, Users, TrendingUp, Sun, Moon } from 'lucide-react';
import type { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const steps = [
  { icon: <Brain className="w-6 h-6" />, title: 'Take the Quiz', desc: 'Tell us your current skills, dream job, and learning preferences in 6 quick questions.' },
  { icon: <Target className="w-6 h-6" />, title: 'Gap Analysis', desc: 'Our AI identifies exactly what skills you\'re missing for your target role.' },
  { icon: <Map className="w-6 h-6" />, title: 'Personalized Roadmap', desc: 'Get a week-by-week plan with free resources curated just for you.' },
  { icon: <Code className="w-6 h-6" />, title: 'Practice DSA', desc: 'Solve company-specific interview questions with guided LeetCode links.' },
  { icon: <BookOpen className="w-6 h-6" />, title: 'Track & Improve', desc: 'Follow structured learning tracks and get AI mentorship 24/7.' },
];

const stats = [
  { value: '10,000+', label: 'Students Guided' },
  { value: '95%', label: 'Placement Rate' },
  { value: '50+', label: 'Top Companies' },
  { value: '500+', label: 'Free Resources' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, author: 'Aditi', message: 'Just finished the DSA track! Feeling much more confident for interviews.', time: '2h ago' },
    { id: 2, author: 'Rohan', message: 'Does anyone have tips for preparing system design for product-based companies?', time: '4h ago' },
    { id: 3, author: 'Neha', message: 'The AI roadmap helped me structure my week perfectly. Highly recommend!', time: '6h ago' },
  ]);
  const [newPost, setNewPost] = useState('');
  const [isDark, setIsDark] = useState<boolean>(
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  function toggleTheme() {
    try {
      const next = !document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      setIsDark(next);
    } catch (e) {
      // ignore
    }
  }

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    setCommunityPosts([
      { id: Date.now(), author: 'You', message: newPost.trim(), time: 'Just now' },
      ...communityPosts,
    ]);
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 dark:text-slate-100">
      <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] pt-24 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Career Planning for Indian Engineers
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              From confusion to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                dream career
              </span>
              , powered by AI
            </h1>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop guessing what to learn. SkillBridge analyzes your skills, identifies gaps, and creates a personalized roadmap to land your dream job at top companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('quiz')}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-400 transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
              >
                Start Free — Takes 2 min
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('tracks')}
                className="flex items-center justify-center gap-2 px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-slate-400 hover:text-white transition-all duration-200"
              >
                Browse Learning Tracks
              </button>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:opacity-90 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span className="text-sm font-medium">{isDark ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">Your 5-Step Journey to Success</h2>
            <p className="text-slate-500 dark:text-slate-300 max-w-xl mx-auto">A proven path taken by 10,000+ engineering students to crack interviews at top companies.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Step {i + 1}</div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">Everything you need to crack your dream job</h2>
              <div className="space-y-5">
                {[
                  { icon: <Brain className="w-5 h-5 text-indigo-500" />, title: 'AI Skill Gap Analysis', desc: 'Powered by Groq LLaMA 3 — identifies missing skills based on job requirements.' },
                  { icon: <Map className="w-5 h-5 text-blue-500" />, title: 'Week-by-Week Roadmaps', desc: 'Personalized learning plans with free resources for every skill you need.' },
                  { icon: <Code className="w-5 h-5 text-green-500" />, title: 'Company-Specific DSA', desc: 'Practice questions filtered by company — Google, Amazon, Microsoft & more.' },
                  { icon: <TrendingUp className="w-5 h-5 text-orange-500" />, title: '24/7 AI Mentor', desc: 'Ask any doubt anytime to our AI chatbot trained on engineering interview content.' },
                ].map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{f.title}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-300">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-900 to-[#1E293B] rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-semibold">AI Roadmap Preview</span>
              </div>
              <div className="space-y-3">
                {['Week 1: JavaScript Fundamentals', 'Week 2: React & Component Patterns', 'Week 3: Node.js & REST APIs', 'Week 4: SQL & Database Design', 'Week 5: System Design Basics'].map((w, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-4 py-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{w}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                <div className="text-indigo-400 text-xs font-medium">Estimated job-ready in</div>
                <div className="text-white font-bold text-lg">16 weeks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-indigo-500 font-semibold uppercase tracking-[0.2em]">Community</p>
                  <h2 className="text-3xl font-bold text-slate-900 mt-3">Join the SkillBridge community</h2>
                </div>
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-500 px-4 py-2 rounded-full text-xs font-semibold">
                  <Users className="w-4 h-4" />
                  1.2k active learners
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5">
                  <textarea
                    value={newPost}
                    onChange={(event) => setNewPost(event.target.value)}
                    placeholder="Share your question, achievement, or tip..."
                    className="w-full min-h-[140px] resize-none rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-4 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-slate-500">Engage with learners, ask doubts, and celebrate progress.</div>
                    <button
                      onClick={handlePostSubmit}
                      className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-400 transition-colors"
                    >
                      Post to community
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {communityPosts.map((post) => (
                    <div key={post.id} className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <p className="font-semibold text-slate-900">{post.author}</p>
                          <p className="text-xs text-slate-500">{post.time}</p>
                        </div>
                        <div className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                          <Users className="w-3.5 h-3.5" />
                          Discussion
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{post.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
                <p className="text-sm text-indigo-500 font-semibold uppercase tracking-[0.2em] mb-4">Why join?</p>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex gap-3 items-start">
                    <span className="mt-1 text-indigo-500">•</span>
                    <span>Get instant motivation from peers and mentors.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-1 text-indigo-500">•</span>
                    <span>Share interview tips, resources, and project ideas.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-1 text-indigo-500">•</span>
                    <span>Collaborate on problem-solving and resume feedback.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-500 p-8 text-white shadow-xl">
                <p className="text-sm uppercase tracking-[0.2em] mb-3 font-semibold">Community highlight</p>
                <h3 className="text-2xl font-bold mb-3">Weekly Mentor AMA</h3>
                <p className="text-sm text-slate-100 leading-relaxed">Join live sessions every Friday to ask career and interview questions directly to experienced mentors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#0F172A]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to bridge your skill gap?</h2>
          <p className="text-slate-400 mb-8">Join 10,000+ engineering students who found clarity with SkillBridge.</p>
          <button
            onClick={() => onNavigate('quiz')}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-400 transition-all duration-200 shadow-lg shadow-indigo-500/25"
          >
            Start Your Free Analysis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <footer className="bg-[#0F172A] border-t border-slate-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold">
            <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            Skill<span className="text-indigo-400">Bridge</span>
          </div>
          <p className="text-slate-500 dark:text-slate-300 text-sm">Built for Indian engineering students. Free forever.</p>
        </div>
      </footer>
    </div>
  );
}
