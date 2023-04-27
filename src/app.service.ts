import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import * as Enums from './enums';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private httpService: HttpService) {}
  getHello() {
    return { message: Enums.Test.Message };
  }

  async search(query: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${Enums.ExternalUrls.YoudaoDict}?q=${query}&doctype=json`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw Enums.ErrorMessages.Failure;
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
      this.httpService.get(`${Enums.ExternalUrls.AnimeAvatar}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw Enums.ErrorMessages.Failure;
        }),
      ),
    );
    return data;
  }

  async getCatImg(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${Enums.ExternalUrls.GetCatImage}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw Enums.ErrorMessages.Failure;
        }),
      ),
    );
    return data;
  }

  async getIPAdress(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${Enums.ExternalUrls.IPAdress}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw Enums.ErrorMessages.Failure;
        }),
      ),
    );
    return data;
  }
}
