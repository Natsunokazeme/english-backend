import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/search')
  search(@Query() query: { id: string }): string {
    return this.appService.search(query.id);
  }

  @Post('/search:id/:name')
  search2(@Param() params: { id: string; name: string }): string {
    return this.appService.search2(params.id, params.name);
  }
}
