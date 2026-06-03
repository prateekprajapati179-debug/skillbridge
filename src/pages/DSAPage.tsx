import { useState, useEffect } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';
import type { DSAQuestion } from '../types';
import { DSA_QUESTIONS, COMPANY_OPTIONS } from '../data';

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: 'bg-green-100 text-green-700 border-green-200',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Hard: 'bg-red-100 text-red-700 border-red-200',
};

export default function DSAPage() {
  const [selectedCompany, setSelectedCompany] = useState('Google');
  const [questions, setQuestions] = useState<DSAQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadQuestions(selectedCompany);
  }, [selectedCompany]);

  const loadQuestions = async (company: string) => {
    setLoading(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/dsa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseKey}`,
          Apikey: supabaseKey,
        },
        body: JSON.stringify({ company }),
      });
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setQuestions(data.questions || DSA_QUESTIONS[company]);
    } catch {
      setQuestions(DSA_QUESTIONS[company] || []);
    } finally {
      setLoading(false);
    }
  };

  const easyCount = questions.filter((q) => q.difficulty === 'Easy').length;
  const mediumCount = questions.filter((q) => q.difficulty === 'Medium').length;
  const hardCount = questions.filter((q) => q.difficulty === 'Hard').length;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">DSA Interview Track</h1>
          <p className="text-slate-500">Practice company-specific data structures & algorithms questions</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Select Company</label>
              <div className="relative">
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="appearance-none bg-slate-50 border-2 border-slate-200 text-slate-800 font-medium rounded-xl px-5 py-3 pr-10 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                >
                  {COMPANY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
              </div>
            </div>
            {!loading && questions.length > 0 && (
              <div className="flex gap-4">
                {[
                  { label: 'Easy', count: easyCount, cls: 'text-green-600 bg-green-50' },
                  { label: 'Medium', count: mediumCount, cls: 'text-yellow-600 bg-yellow-50' },
                  { label: 'Hard', count: hardCount, cls: 'text-red-600 bg-red-50' },
                ].map(({ label, count, cls }) => (
                  <div key={label} className={`text-center px-4 py-2 rounded-xl ${cls}`}>
                    <div className="text-xl font-bold">{count}</div>
                    <div className="text-xs font-medium">{label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((q, i) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 truncate">{q.title}</div>
                    <div className="text-sm text-slate-500">{q.topic}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-3 py-1 rounded-lg border text-xs font-semibold ${DIFFICULTY_STYLES[q.difficulty]}`}>
                    {q.difficulty}
                  </span>
                  <a
                    href={q.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-xl text-sm font-semibold hover:bg-orange-100 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    LeetCode
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
