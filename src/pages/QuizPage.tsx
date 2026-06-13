import { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import type { QuizAnswers, Page } from '../types';
import { SKILLS_OPTIONS, DREAM_JOB_OPTIONS, COMPANY_OPTIONS, YEAR_OPTIONS, TOPIC_AREAS } from '../data';

interface QuizPageProps {
  onComplete: (answers: QuizAnswers) => void;
  onNavigate: (page: Page) => void;
}

const TOTAL_STEPS = 7;

export default function QuizPage({ onComplete }: QuizPageProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    skills: [],
    dreamJob: '',
    hoursPerWeek: 15,
    targetCompanies: [],
    year: '',
    learningStyle: '',
    topicInterests: [],
  });

  const toggleCheckbox = (field: 'skills' | 'targetCompanies', value: string) => {
    setAnswers((prev) => {
      const current = prev[field];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const canProceed = () => {
    switch (step) {
      case 0: return answers.skills.length > 0;
      case 1: return answers.dreamJob !== '';
      case 2: return true;
      case 3: return answers.targetCompanies.length > 0;
      case 4: return answers.year !== '';
      case 5: return answers.learningStyle !== '';
      case 6: return answers.topicInterests && answers.topicInterests.length > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else onComplete(answers);
  };

  const progressPercent = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100 pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Skill Gap Analysis</h1>
          <p className="text-slate-500 dark:text-slate-300">Answer 6 quick questions to get your personalized roadmap</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
            <span>Question {step + 1} of {TOTAL_STEPS}</span>
            <span>{Math.round(progressPercent)}% complete</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 min-h-[360px] flex flex-col">
          <div className="flex-1">
            {step === 0 && (
              <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">What are your current skills?</h2>
                  <p className="text-slate-500 dark:text-slate-300 text-sm mb-6">Select all that apply</p>
                <div className="flex flex-wrap gap-3">
                  {SKILLS_OPTIONS.map((skill) => {
                    const selected = answers.skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleCheckbox('skills', skill)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${
                          selected
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-slate-200 text-slate-600 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {selected && <CheckCircle className="w-4 h-4 text-indigo-500" />}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">What is your dream job?</h2>
                <p className="text-slate-500 dark:text-slate-300 text-sm mb-6">Select the role you want to land</p>
                <div className="space-y-3">
                  {DREAM_JOB_OPTIONS.map((job) => (
                    <button
                      key={job}
                      onClick={() => setAnswers({ ...answers, dreamJob: job })}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-200 flex items-center justify-between ${
                        answers.dreamJob === job
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 text-slate-700 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {job}
                      {answers.dreamJob === job && <CheckCircle className="w-5 h-5 text-indigo-500" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">How many hours/week can you study?</h2>
                <p className="text-slate-500 dark:text-slate-300 text-sm mb-8">Be honest — this helps us set realistic timelines</p>
                <div className="px-2">
                  <div className="text-center mb-6">
                    <span className="text-5xl font-bold text-indigo-600">{answers.hoursPerWeek}</span>
                    <span className="text-xl text-slate-500 dark:text-slate-300 ml-2">hrs/week</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={40}
                    step={5}
                    value={answers.hoursPerWeek}
                    onChange={(e) => setAnswers({ ...answers, hoursPerWeek: Number(e.target.value) })}
                    className="w-full accent-indigo-500"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>5 hrs</span>
                    <span>20 hrs</span>
                    <span>40 hrs</span>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Which companies are you targeting?</h2>
                <p className="text-slate-500 dark:text-slate-300 text-sm mb-6">Select all that you'd love to work at</p>
                <div className="flex flex-wrap gap-3">
                  {COMPANY_OPTIONS.map((company) => {
                    const selected = answers.targetCompanies.includes(company);
                    return (
                      <button
                        key={company}
                        onClick={() => toggleCheckbox('targetCompanies', company)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${
                          selected
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-slate-200 text-slate-600 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {selected && <CheckCircle className="w-4 h-4 text-indigo-500" />}
                        {company}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">What is your current year?</h2>
                <p className="text-slate-500 dark:text-slate-300 text-sm mb-6">This helps us tailor the timeline</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {YEAR_OPTIONS.map((year) => (
                    <button
                      key={year}
                      onClick={() => setAnswers({ ...answers, year })}
                      className={`px-5 py-4 rounded-xl border-2 font-medium text-sm transition-all duration-200 flex items-center justify-between gap-2 ${
                        answers.year === year
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 text-slate-700 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {year} Year
                      {answers.year === year && <CheckCircle className="w-4 h-4 text-indigo-500" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">What is your preferred learning style?</h2>
                <p className="text-slate-500 dark:text-slate-300 text-sm mb-6">We'll recommend resources based on your style</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { style: 'Videos', icon: '🎬', desc: 'YouTube tutorials, video courses' },
                    { style: 'Reading', icon: '📖', desc: 'Docs, blogs, books' },
                    { style: 'Projects', icon: '🛠️', desc: 'Hands-on building' },
                    { style: 'All', icon: '⚡', desc: 'Mix of everything' },
                  ].map(({ style, icon, desc }) => (
                    <button
                      key={style}
                      onClick={() => setAnswers({ ...answers, learningStyle: style })}
                      className={`p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                        answers.learningStyle === style
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{icon}</div>
                      <div className={`font-semibold text-sm mb-1 ${answers.learningStyle === style ? 'text-indigo-700' : 'text-slate-900 dark:text-slate-100'}`}>{style}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-300">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Which learning areas interest you?</h2>
                <p className="text-slate-500 dark:text-slate-300 text-sm mb-6">Select all that apply — we'll create personalized roadmaps</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TOPIC_AREAS.map((topic) => {
                    const selected = answers.topicInterests?.includes(topic.value);
                    return (
                      <button
                        key={topic.value}
                        onClick={() => {
                          const currentInterests = answers.topicInterests || [];
                          setAnswers({
                            ...answers,
                            topicInterests: currentInterests.includes(topic.value)
                              ? currentInterests.filter((v) => v !== topic.value)
                              : [...currentInterests, topic.value],
                          });
                        }}
                        className={`flex items-center gap-3 px-5 py-4 rounded-xl border-2 font-medium transition-all duration-200 text-left ${
                          selected
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-slate-200 text-slate-600 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {selected && <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" />}
                        <span className={!selected ? 'ml-2' : ''}>{topic.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 disabled:opacity-30 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            >
              {step === TOTAL_STEPS - 1 ? 'Generate My Roadmap' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
