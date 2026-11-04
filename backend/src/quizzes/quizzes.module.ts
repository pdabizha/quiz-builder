import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller.js';
import { QuizzesService } from './quizzes.service.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quiz } from './entities/quiz.entity.js';
import { Question } from './entities/question.entity.js';
import { Option } from './entities/option.entity.js';

@Module({
  imports: [SequelizeModule.forFeature([Quiz, Question, Option])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
