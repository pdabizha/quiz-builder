import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Question } from './question.entity.js';

@Table
export class Option extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare questionId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare text: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare isCorrect: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare order: number;
}
