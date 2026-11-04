export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface QuizListItem {
  id: string;
  title: string;
  questionCount: number;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  order: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: QuestionType;
  order: number;
  expectedAnswer?: string | null;
  options: QuizOption[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface CreateQuizOption {
  text: string;
  isCorrect: boolean;
  order: number;
}

export interface CreateQuizQuestion {
  text: string;
  type: QuestionType;
  order: number;
  expectedAnswer?: string;
  options: CreateQuizOption[];
}

export interface CreateQuizPayload {
  title: string;
  questions: CreateQuizQuestion[];
}
