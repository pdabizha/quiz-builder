import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { QuestionDto } from './question.dto.js';

export class QuizDto {
  @IsString()
  @Matches(/\S/, { message: 'Quiz title cannot be empty' })
  title: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
