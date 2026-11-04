import { IsBoolean, IsString, Matches } from 'class-validator';

export class OptionDto {
  @IsString()
  @Matches(/\S/, { message: 'Option text cannot be empty' })
  text: string;

  @IsBoolean()
  isCorrect: boolean;
}
