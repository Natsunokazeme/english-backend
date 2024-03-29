import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MidJourneyResponse } from './app.interface';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/search')
  search(@Query() query: { id: string }): Promise<any> {
    return this.appService.search(query.id);
  }

  @Post('/search:id/:name')
  search2(@Param() params: { id: string; name: string }): string {
    return this.appService.search2(params.id, params.name);
  }

  @Get('/getCatImg')
  getCatImg(): Promise<{ code: string; imgurl: string }> {
    return this.appService.getCatImg();
  }

  @Get('/IPAdress')
  getIPAdress(): Promise<{ code: string; ip: string }> {
    return this.appService.getIPAdress();
  }

  @Post('/createImage')
  getMidjourney(
    @Body()
    body: {
      prompt: string;
      width?: number;
      height?: number;
      guidance_scale?: number;
      negative_prompts?: string;
      steps?: number;
      style?: string;
    },
  ): Promise<MidJourneyResponse> {
    return this.appService.getMidjourney({
      ...body,
      width: body.width ?? 720,
      height: body.height ?? 720,
    });
  }

  // @Post('/createImageByImage')
  // createImageByImage(
  //   @Body()
  //   body: {
  //     file: File;
  //   },
  // ): Promise<MidJourneyResponse> {
  //   return this.appService.createImageByImage(body.file);
  // }
}
