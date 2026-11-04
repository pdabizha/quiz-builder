import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Quiz } from './quiz.entity.js';
import { Option } from './option.entity.js';

export enum QuestionType {
  BOOLEAN = 'BOOLEAN',
  INPUT = 'INPUT',
  CHECKBOX = 'CHECKBOX',
}

@Table
export class Question extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => Quiz)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare quizId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare text: string;

  @Column({
    type: DataType.ENUM(...Object.values(QuestionType)),
    allowNull: false,
  })
  declare type: QuestionType;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare order: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare expectedAnswer: string | null;

  @HasMany(() => Option, { onDelete: 'CASCADE' })
  declare options: Option[];
}
