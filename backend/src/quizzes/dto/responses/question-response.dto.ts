import { QuestionType } from '../../entities/question.entity.js';
import { OptionResponseDto } from './option-response.dto.js';

export class QuestionResponseDto {
  id: string;
  text: string;
  type: QuestionType;
  order: number;
  expectedAnswer?: string | null;
  options: OptionResponseDto[];
}
