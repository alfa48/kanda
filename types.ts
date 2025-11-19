
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

export interface Teacher {
  id: string;
  name: string;
  specialty: string;
  avatarUrl?: string;
  bio: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher'; // Added role
  targetCourse?: string; // Student only
  academicLevel?: number; // Student only
  streakDays?: number; // Student only
  totalXP?: number; // Student only
  teacherId?: string; // Student only
  
  // Teacher specific fields
  specialty?: string;
  bio?: string;
}

export interface Recommendation {
  id: string;
  type: 'content' | 'exercise';
  title: string;
  reason: string;
  targetId: string;
}
