import { IsBoolean, IsInt, IsString } from "class-validator";

export class OptionDto {
  @IsString()
  text: string;

  @IsBoolean()
  isCorrect: boolean;

  @IsInt()
  order: number;
}
