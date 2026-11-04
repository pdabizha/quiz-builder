import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QuestionType } from '../../entities/question.entity.js';
import { OptionDto } from './option.dto.js';
import { Type } from 'class-transformer';

export class QuestionDto {
  @IsString()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsInt()
  order: number;

  @IsOptional()
  @IsString()
  expectedAnswer?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];
}
