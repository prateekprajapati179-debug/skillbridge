import { useState } from 'react';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import RoadmapPage from './pages/RoadmapPage';
import DSAPage from './pages/DSAPage';
import TracksPage from './pages/TracksPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import type { Page, QuizAnswers } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizAnswers(answers);
    handleNavigate('roadmap');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#071026] dark:text-slate-100">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main>
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'quiz' && (
          <QuizPage onComplete={handleQuizComplete} onNavigate={handleNavigate} />
        )}
        {currentPage === 'roadmap' && (
          <RoadmapPage quizAnswers={quizAnswers} onNavigate={handleNavigate} />
        )}
        {currentPage === 'dsa' && <DSAPage />}
        {currentPage === 'tracks' && <TracksPage />}
        {currentPage === 'profile' && <ProfilePage onNavigate={handleNavigate} />}
        {currentPage === 'leaderboard' && <LeaderboardPage />}
      </main>

      <Chatbot />
    </div>
  );
}
