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

  @Post('/login')
  login(
    @Body() body: { username: string; password: string },
  ): Promise<{ code: string; imgurl: string }> {
    return this.appService.login(body.username, body.password);
  }

  @Get('/getCatImg')
  getCatImg(): Promise<{ code: string; imgurl: string }> {
    return this.appService.getCatImg();
  }

  @Get('/IPAdress')
  getIPAdress(): Promise<{ code: string; ip: string }> {
    return this.appService.getIPAdress();
  }

  @Get('/createImage')
  getMidjourney(
    @Query() query: { prompt: string },
  ): Promise<MidJourneyResponse> {
    return this.appService.getMidjourney({
      prompt: query.prompt,
      width: 720,
      height: 720,
    });
  }
}
