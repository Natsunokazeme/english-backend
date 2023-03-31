import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WordEntity } from './word.entity';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  getHello(): string {
    return this.wordService.getHello();
  }

  @Get('findAll')
  findAll() {
    return this.wordService.findAll();
  }

  @Get('findOne')
  findOne(@Query() query: { text: string }) {
    return this.wordService.findOne(query.text);
  }

  @Post('create')
  create(@Body() body: WordEntity) {
    return this.wordService.create(body);
  }
}
