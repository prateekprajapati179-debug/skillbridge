import { useState } from 'react';
import { ExternalLink, Clock } from 'lucide-react';
import { LEARNING_TRACKS } from '../data';

const TABS = ['DSA', 'AI/ML', 'Web Dev', 'App Dev'] as const;

const TAB_COLORS: Record<string, string> = {
  DSA: 'from-blue-500 to-blue-600',
  'AI/ML': 'from-purple-500 to-pink-500',
  'Web Dev': 'from-green-500 to-teal-500',
  'App Dev': 'from-orange-500 to-red-500',
};

const LEVEL_COLORS: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
  'Beginner to Advanced': 'bg-blue-100 text-blue-700',
};

export default function TracksPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('DSA');

  const resources = LEARNING_TRACKS[activeTab] || [];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Learning Tracks</h1>
          <p className="text-slate-500">Curated free resources for every engineering career path</p>
        </div>

        <div className="flex gap-2 bg-white rounded-2xl p-2 border border-slate-100 shadow-sm mb-8 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-fit px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={`bg-gradient-to-r ${TAB_COLORS[activeTab]} rounded-2xl p-6 mb-8 text-white`}>
          <div className="text-sm font-medium opacity-80 mb-1">{resources.length} Curated Resources</div>
          <h2 className="text-2xl font-bold mb-2">{activeTab} Track</h2>
          <p className="text-sm opacity-90">
            {activeTab === 'DSA' && 'Master data structures and algorithms to crack top tech interviews.'}
            {activeTab === 'AI/ML' && 'Learn machine learning, deep learning, and NLP from the best instructors.'}
            {activeTab === 'Web Dev' && 'Go from zero to full-stack developer with these industry-proven resources.'}
            {activeTab === 'App Dev' && 'Build cross-platform mobile apps for iOS and Android.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {resources.map((resource, i) => (
            <div
              key={resource.name}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${LEVEL_COLORS[resource.level] || 'bg-slate-100 text-slate-600'}`}>
                    {resource.level}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-lg mb-2">{resource.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{resource.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {resource.duration}
                </div>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-xl text-sm font-semibold hover:bg-indigo-100 transition-colors"
                >
                  Start Learning
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
