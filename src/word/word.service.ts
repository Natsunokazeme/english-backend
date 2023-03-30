import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WordEntity } from './word.entity';

@Injectable()
export class WordService {
  constructor(
    @Inject('WordRepositoryToken')
    private wordRepository: Repository<WordEntity>,
  ) {}

  async findAll(): Promise<WordEntity[]> {
    return await this.wordRepository.find();
  }

  // async findOne(id: number): Promise<WordEntity> {
  //   return await this.wordRepository.findOne();
  // }
}
