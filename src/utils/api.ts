import { supabase } from '../lib/supabase';
import type { QuizAnswers, UserProgress, LeaderboardEntry } from '../types';

export async function submitQuizAndGenerateRoadmap(quizAnswers: QuizAnswers) {
  try {
    const response = await supabase.functions.invoke('quiz-submit', {
      body: { quizAnswers },
    });

    if (response.error) throw response.error;
    return response.data;
  } catch (error) {
    console.error('Error submitting quiz:', error);
    throw error;
  }
}

export async function generateRoadmapByTopic(topicInterests: string[], answers: QuizAnswers) {
  try {
    const response = await supabase.functions.invoke('generate-roadmap', {
      body: { topicInterests, answers },
    });

    if (response.error) throw response.error;
    return response.data;
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw error;
  }
}

export async function getUserProfile(userId: string) {
  try {
    const response = await supabase.functions.invoke('user-profile', {
      body: { userId, action: 'get' },
    });

    if (response.error) throw response.error;
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function updateUserProgress(userId: string, progress: Partial<UserProgress>) {
  try {
    const response = await supabase.functions.invoke('progress-update', {
      body: { userId, progress },
    });

    if (response.error) throw response.error;
    return response.data;
  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
}

export async function getLeaderboard() {
  try {
    const response = await supabase.functions.invoke('leaderboard', {
      body: {},
    });

    if (response.error) throw response.error;
    return response.data as LeaderboardEntry[];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
}

export async function completeLesson(userId: string, lessonId: string, points: number) {
  try {
    const response = await supabase.functions.invoke('progress-update', {
      body: { 
        userId, 
        action: 'complete-lesson',
        lessonId,
        points,
      },
    });

    if (response.error) throw response.error;
    return response.data;
  } catch (error) {
    console.error('Error completing lesson:', error);
    throw error;
  }
}

export async function earnBadge(userId: string, badgeName: string) {
  try {
    const response = await supabase.functions.invoke('progress-update', {
      body: { 
        userId, 
        action: 'earn-badge',
        badgeName,
      },
    });

    if (response.error) throw response.error;
    return response.data;
  } catch (error) {
    console.error('Error earning badge:', error);
    throw error;
  }
}
