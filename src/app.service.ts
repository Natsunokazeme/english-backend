import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private httpService: HttpService) { }
  getHello() {
    return { message: 'Hello World!' };
  }

  async search(query: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`http://dict.youdao.com/suggest?q=${query}&doctype=json`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  search2(id: string, name: string): string {
    return `Searching for ${id} and ${name}`;
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ code: string; imgurl: string }> {
    console.log(username, password);
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://api.uomg.com/api/rand.avatar?sort=动漫男&format=json')
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
