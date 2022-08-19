import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  search(query: string): string {
    return `Searching for ${query}`;
  }
}
