import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { MidJourneyRequest, MidJourneyResponse } from './app.interface';
import * as Enums from './enums';

@Injectable()
export class AppService {
  private mdjToken = '';
  private readonly APIKEY = '22992aa8a23a90ec58c3dc8735f7378b';
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

  async getMidjourney(config: MidJourneyRequest): Promise<MidJourneyResponse> {
    if (!this.mdjToken) {
      //get token
      await this.loginMidjourney();
    }
    const { data } = await firstValueFrom(
      this.httpService
        .post(`${Enums.ExternalUrls.Midjourney}/v1/text2img`, config, {
          headers: {
            token: this.mdjToken,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw Enums.ErrorMessages.Failure;
          }),
        ),
    );
    return data;
  }

  async loginMidjourney(): Promise<void> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `${Enums.ExternalUrls.Midjourney}/auth/getToken?apikey=${this.APIKEY}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw Enums.ErrorMessages.Failure;
          }),
        ),
    );
    console.log(data);
    this.mdjToken = data.data.token;
  }

  // async createImageByImage(file: any): Promise<MidJourneyResponse> {
  //   if (!this.mdjToken) {
  //     //get token
  //     await this.loginMidjourney();
  //   }

  //   const { data } = await firstValueFrom(
  //     this.httpService
  //       .post(`${Enums.ExternalUrls.Midjourney}/v1/img2img`, file, {

  // async createAccount(user: {
  //   username: string;
  //   password: string;
  //   email?: string;
  // }): Promise<any> {
  //   if (user.email?.length > 0) {
  //     //send email
  //   }
  //   //create account in db with MD5 password
  //   const hashPassword = CryptoJS.MD5(user.password).toString();

  //   return { code: '200', message: 'success' };
  // }
}
