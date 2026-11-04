import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service.js';
import { CreateQuizDto } from './dto/requests/create-quiz.dto.js';

const uuidPipe = new ParseUUIDPipe({
  errorHttpStatusCode: HttpStatus.NOT_FOUND,
});

@Controller('quizzes')
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @Get() findAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id') findOne(@Param('id', uuidPipe) id: string) {
    return this.quizzesService.findOne(id);
  }

  @Delete(':id') remove(@Param('id', uuidPipe) id: string) {
    return this.quizzesService.remove(id);
  }
}
