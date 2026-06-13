import { useState, useEffect } from 'react';
import { Trophy, Medal } from 'lucide-react';
import type { LeaderboardEntry } from '../types';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    // Mock data - in production this would call getLeaderboard()
    setTimeout(() => {
      const mockLeaderboard: LeaderboardEntry[] = [
        { id: '1', userId: 'user-1', username: 'Sarah Chen', totalPoints: 2850, badgesCount: 12, rank: 1 },
        { id: '2', userId: 'user-2', username: 'Arjun Patel', totalPoints: 2720, badgesCount: 11, rank: 2 },
        { id: '3', userId: 'user-3', username: 'Priya Sharma', totalPoints: 2650, badgesCount: 10, rank: 3 },
        { id: '4', userId: 'user-4', username: 'Rahul Kumar', totalPoints: 2480, badgesCount: 9, rank: 4 },
        { id: '5', userId: 'user-5', username: 'Neha Gupta', totalPoints: 2350, badgesCount: 8, rank: 5 },
        { id: '6', userId: 'user-6', username: 'Aditya Singh', totalPoints: 2200, badgesCount: 7, rank: 6 },
        { id: '7', userId: 'user-7', username: 'Divya Nair', totalPoints: 2100, badgesCount: 6, rank: 7 },
        { id: '8', userId: 'user-8', username: 'Vikram Reddy', totalPoints: 1950, badgesCount: 5, rank: 8 },
        { id: '9', userId: 'user-9', username: 'Anjali Verma', totalPoints: 1800, badgesCount: 5, rank: 9 },
        { id: '10', userId: 'user-10', username: 'Rohan Malhotra', totalPoints: 1650, badgesCount: 4, rank: 10 },
      ];
      setLeaderboard(mockLeaderboard);
      setUserRank(6); // Mock current user at rank 6
      setLoading(false);
    }, 500);
  }, []);

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <div className="text-2xl">🥇</div>;
      case 2:
        return <div className="text-2xl">🥈</div>;
      case 3:
        return <div className="text-2xl">🥉</div>;
      default:
        return <div className="text-lg font-bold text-slate-600 w-8 flex items-center justify-center">{rank}</div>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100 pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-amber-500" />
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Global Leaderboard</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg">Compete with learners worldwide and climb the ranks</p>
        </div>

        {/* User's Rank Card */}
        {userRank && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 mb-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium mb-1">Your Current Rank</p>
                <p className="text-3xl font-bold mb-2">Rank #{userRank}</p>
                <p className="text-indigo-100">You're in the top 6! Keep grinding 🚀</p>
              </div>
              <div className="text-6xl">🎯</div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">User</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-slate-100">Points</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-slate-100">Badges</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-slate-100">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {leaderboard.map((entry) => (
                  <tr
                    key={entry.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      entry.rank === userRank ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getMedalIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                          {entry.username.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{entry.username}</p>
                          {entry.rank === userRank && (
                            <p className="text-xs text-indigo-600 font-medium">You</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{entry.totalPoints}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-300">points</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-2xl">🏆</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{entry.badgesCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {entry.rank <= 3 ? (
                          <span className="text-green-600 font-semibold">↑ Rising</span>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-300 font-semibold">→ Stable</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Top Reward</h3>
            </div>
            <p className="text-2xl font-bold text-amber-600 mb-2">5 Free Credits</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">Reach #1 in global rankings</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Medal className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Your Points</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600 mb-2">450</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">Earn more by completing lessons</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Next Level</h3>
            </div>
            <p className="text-2xl font-bold text-indigo-600 mb-2">550 Points</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">100 points to rank up!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
