import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordEntity } from './word.entity';

@Injectable()
export class WordService {
  constructor(
    // @Inject('WordRepositoryToken')
    @InjectRepository(WordEntity)
    private wordRepository: Repository<WordEntity>,
  ) {}

  async findAll(): Promise<WordEntity[]> {
    return await this.wordRepository.find();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async findOne(text: string): Promise<WordEntity> {
    return await this.wordRepository.findOneBy({ text });
  }

  async create(word: WordEntity): Promise<WordEntity> {
    await this.wordRepository.save(word);
    return this.findOne(word.text);
  }

  async update(id: number, word: WordEntity): Promise<WordEntity> {
    await this.wordRepository.update(id, word);
    return await this.wordRepository.findOneBy({ text: word.text });
  }

  async delete(id: number): Promise<WordEntity | null> {
    await this.wordRepository.delete(id);
    const res = await this.wordRepository.findOneBy({ id });
    return res;
  }
}
