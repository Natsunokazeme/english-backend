import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordModule } from './word/word.module';

@Module({
  imports: [HttpModule, WordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
