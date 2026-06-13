import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import type { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navLinks: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Quiz', page: 'quiz' },
  { label: 'DSA Track', page: 'dsa' },
  { label: 'Learning Tracks', page: 'tracks' },
  { label: 'Profile', page: 'profile' },
  { label: 'Leaderboard', page: 'leaderboard' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0F172A] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-slate-900 dark:text-white font-bold text-xl hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-500 flex items-center justify-center shadow-md">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="text-white"
              >
                <path d="M2 15 C6 10, 10 8, 12 8 C14 8, 18 10, 22 15" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95" />
                <rect x="3" y="15" width="18" height="3" rx="1" fill="white" opacity="0.12" />
                <text x="12" y="16.3" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">SB</text>
              </svg>
            </div>
            <span>Skill<span className="text-indigo-200">Bridge</span></span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-indigo-500 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white hover:bg-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => onNavigate('quiz')}
              className="ml-3 px-5 py-2 rounded-lg bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 transition-colors"
            >
              Start Free
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="ml-3 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:opacity-90 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="text-slate-600 dark:text-slate-300"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-[#0F172A] border-t border-slate-700 px-4 py-3 space-y-1">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => {
                onNavigate(page);
                setMobileOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-indigo-500 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
