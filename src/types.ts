export type Page = 'home' | 'quiz' | 'roadmap' | 'dsa' | 'tracks' | 'profile' | 'leaderboard';

export interface QuizAnswers {
  skills: string[];
  dreamJob: string;
  hoursPerWeek: number;
  targetCompanies: string[];
  year: string;
  learningStyle: string;
  topicInterests?: string[];
}

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  preferences?: Record<string, unknown>;
}

export interface QuizResponse {
  id: string;
  userId: string;
  answers: QuizAnswers;
  topicInterests: string[];
  completedAt: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  courseTrack: string;
  lessonsCompleted: number;
  totalScore: number;
  badges: string[];
  lastUpdated: string;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  username: string;
  totalPoints: number;
  badgesCount: number;
  rank: number;
}

export interface RoadmapWeek {
  week: number;
  topic: string;
  tasks: string[];
  resources: { title: string; url: string }[];
}

export interface RoadmapData {
  missingSkills: string[];
  estimatedWeeks: number;
  weeklyPlan: RoadmapWeek[];
}

export interface DSAQuestion {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  leetcodeUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ResourceCard {
  name: string;
  description: string;
  url: string;
  level: string;
  duration: string;
}
