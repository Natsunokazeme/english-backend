import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const re = await this.userService.create(createUserDto);
    res.cookie('token', re.token, {
      expires: new Date(Date.now() + 1000 * 60 * 10),
      httpOnly: true,
    });
    return res.send(re);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const re = await this.userService.login(createUserDto);
    if (re.code === 200) {
      res.cookie('token', re.token, {
        expires: new Date(Date.now() + 1000 * 60 * 10),
        httpOnly: true,
      });
    }
    return res.send(re);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
