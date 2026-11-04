import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  Validate,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '../../entities/question.entity.js';
import { OptionDto } from './option.dto.js';

@ValidatorConstraint({ name: 'questionStructure', async: false })
class QuestionStructureConstraint implements ValidatorConstraintInterface {
  validate(_: unknown, args: ValidationArguments): boolean {
    const question = args.object as QuestionDto;
    const options = question.options ?? [];

    switch (question.type) {
      case QuestionType.INPUT:
        return Boolean(question.expectedAnswer?.trim()) && options.length === 0;

      case QuestionType.BOOLEAN: {
        const optionTexts = options.map((option) =>
          option.text?.trim().toLowerCase(),
        );

        return (
          options.length === 2 &&
          optionTexts.includes('true') &&
          optionTexts.includes('false') &&
          options.filter((option) => option.isCorrect).length === 1
        );
      }

      case QuestionType.CHECKBOX:
        return (
          options.length >= 2 && options.some((option) => option.isCorrect)
        );

      default:
        return false;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    const question = args.object as QuestionDto;

    switch (question.type) {
      case QuestionType.INPUT:
        return 'Input questions require an expected answer and cannot have options';

      case QuestionType.BOOLEAN:
        return 'Boolean questions must have True and False options, with exactly one correct answer';

      case QuestionType.CHECKBOX:
        return 'Checkbox questions must have at least two options and one correct answer';

      default:
        return 'Invalid question structure';
    }
  }
}

export class QuestionDto {
  @IsString()
  @Matches(/\S/, { message: 'Question text cannot be empty' })
  text: string;

  @IsEnum(QuestionType)
  @Validate(QuestionStructureConstraint)
  type: QuestionType;

  @IsOptional()
  @IsString()
  @Matches(/\S/, { message: 'Expected answer cannot be empty' })
  expectedAnswer?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];
}
