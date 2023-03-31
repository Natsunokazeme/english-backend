import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { DatabaseModule } from '../database.module';
import { WordController } from './word.controller';
import { WordEntity } from './word.entity';
// import { wordProviders } from './word.providers';
import { WordService } from './word.service';

@Module({
  imports: [TypeOrmModule.forFeature([WordEntity])],
  controllers: [WordController],
  providers: [WordService],
})
export class WordModule {}
