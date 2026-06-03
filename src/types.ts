export type Page = 'home' | 'quiz' | 'roadmap' | 'dsa' | 'tracks';

export interface QuizAnswers {
  skills: string[];
  dreamJob: string;
  hoursPerWeek: number;
  targetCompanies: string[];
  year: string;
  learningStyle: string;
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
