import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateQuizDto } from './dto/requests/create-quiz.dto.js';
import { Quiz } from './entities/quiz.entity.js';
import { Question } from './entities/question.entity.js';
import { Option as QuizOption } from './entities/option.entity.js';

import {
  QuizResponseDto,
  QuizListResponseDto,
} from './dto/responses/quiz-response.dto.js';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz)
    private quizModel: typeof Quiz,

    @InjectConnection()
    private sequelize: Sequelize,
  ) {}

  private toResponse(quiz: Quiz): QuizResponseDto {
    return {
      id: quiz.id,
      title: quiz.title,
      questions: quiz.questions.map((q) => ({
        id: q.id,
        text: q.text,
        type: q.type,
        order: q.order,
        ...(q.expectedAnswer !== null && { expectedAnswer: q.expectedAnswer }),
        options: q.options.map((o) => ({
          id: o.id,
          text: o.text,
          isCorrect: o.isCorrect,
          order: o.order,
        })),
      })),
    };
  }

  async create(dto: CreateQuizDto): Promise<QuizResponseDto> {
    const quiz = await this.sequelize.transaction((transaction) =>
      this.quizModel.create(
        {
          title: dto.title,
          questions: dto.questions.map((question, index) => ({
            text: question.text,
            type: question.type,
            expectedAnswer: question.expectedAnswer ?? null,
            order: index,
            options: (question.options ?? []).map((option, optionIndex) => ({
              text: option.text,
              isCorrect: option.isCorrect,
              order: optionIndex,
            })),
          })),
        },
        { include: [{ model: Question, include: [QuizOption] }], transaction },
      ),
    );

    return this.findOne(quiz.id);
  }

  async findAll(): Promise<QuizListResponseDto[]> {
    const quizzes = await this.quizModel.findAll({
      include: [{ model: Question, attributes: ['id'] }],
      order: [['createdAt', 'DESC']],
    });

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz.questions.length,
      createdAt: quiz.createdAt,
    }));
  }

  async findOne(id: string): Promise<QuizResponseDto> {
    const quiz = await this.quizModel.findByPk(id, {
      include: [
        {
          model: Question,
          include: [QuizOption],
        },
      ],
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return this.toResponse(quiz);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.quizModel.destroy({ where: { id } });

    if (deleted === 0) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
  }
}
