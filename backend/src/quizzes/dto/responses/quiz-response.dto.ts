
import { QuestionResponseDto } from './question-response.dto.js';

export class QuizResponseDto {
  id: string;
  title: string;
  questions: QuestionResponseDto[];
}

export class QuizListResponseDto {
  id: string;
  title: string;
  questionCount: number;
}