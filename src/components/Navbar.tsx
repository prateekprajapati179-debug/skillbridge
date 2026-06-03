import { useState } from 'react';
import { Brain, Menu, X } from 'lucide-react';
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
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white font-bold text-xl hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span>Skill<span className="text-indigo-400">Bridge</span></span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-indigo-500 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
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
          </div>

          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0F172A] border-t border-slate-700 px-4 py-3 space-y-1">
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
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
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
