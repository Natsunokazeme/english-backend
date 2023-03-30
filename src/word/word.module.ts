import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { wordProviders } from './word.providers';
import { WordService } from './word.service';

@Module({
  imports: [DatabaseModule],
  providers: [WordService, ...wordProviders],
})
export class WordModule {}
