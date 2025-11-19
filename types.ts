export enum ExerciseType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
}

export interface Exercise {
  id: string;
  topicId: string;
  statement: string;
  type: ExerciseType;
  options: string[];
  correctAnswer: number; // index
  explanation: string;
}

export interface Topic {
  id: string;
  moduleId: string;
  title: string;
  content: string; // Markdown or HTML
  order: number;
  isCompleted: boolean;
  exercises?: Exercise[];
}

export interface Module {
  id: string;
  disciplineId: string;
  title: string;
  description: string;
  order: number;
  topics: Topic[];
}

export interface Discipline {
  id: string;
  name: string; // e.g., Mathematics
  description: string;
  progress: number; // 0-100
  color: string;
  modules: Module[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  targetCourse: string; // e.g., Engineering
  academicLevel: number;
  streakDays: number;
  totalXP: number;
}

export interface Recommendation {
  id: string;
  type: 'content' | 'exercise';
  title: string;
  reason: string;
  targetId: string;
}
