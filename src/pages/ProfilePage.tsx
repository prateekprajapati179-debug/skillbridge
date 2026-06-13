import { useState, useEffect } from 'react';
import { Trophy, Award, BookOpen, Zap } from 'lucide-react';
import type { Page, UserProgress } from '../types';
import { MOCK_BADGES } from '../data';

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in production this would call getUserProfile()
    setTimeout(() => {
      setProgress({
        id: '1',
        userId: 'user-1',
        courseTrack: 'Full Stack Development',
        lessonsCompleted: 12,
        totalScore: 450,
        badges: MOCK_BADGES.slice(0, 3),
        lastUpdated: new Date().toISOString(),
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100 pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">Your Learning Journey</h1>
          <p className="text-slate-600 dark:text-slate-300">Track your progress and celebrate your achievements</p>
        </div>

        {progress && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Lessons Done</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{progress.lessonsCompleted}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Total Points</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{progress.totalScore}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Badges Earned</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{progress.badges.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Current Track</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2">{progress.courseTrack}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Learning Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Course Completion</span>
                    <span className="text-sm font-semibold text-indigo-600">40%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                      <div
                      className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: '40%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">DSA Mastery</span>
                    <span className="text-sm font-semibold text-purple-600">65%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: '65%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Project Building</span>
                    <span className="text-sm font-semibold text-amber-600">50%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-amber-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Badges Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Achievements Unlocked
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {progress.badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900 dark:to-yellow-900 rounded-lg border border-amber-200 dark:border-amber-700 hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl mb-2">🏆</div>
                    <p className="text-sm font-semibold text-slate-900 text-center">{badge}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  <span className="font-semibold">Next milestone:</span> Earn 3 more badges to unlock "Learning Master"
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => onNavigate('dsa')}
                className="p-6 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors font-semibold text-lg"
              >
                Continue DSA Practice
              </button>
              <button
                onClick={() => onNavigate('leaderboard')}
                className="p-6 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-semibold text-lg"
              >
                View Leaderboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
