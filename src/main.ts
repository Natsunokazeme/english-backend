import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as cors from 'cors';
// import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(3010);
}
bootstrap();
