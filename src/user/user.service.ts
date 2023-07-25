import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as CryptoJS from 'crypto-js';
import * as nodemailer from 'nodemailer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async sendEmail(email: string) {
    const transporter = nodemailer.createTransport({
      service: 'QQ',
      auth: {
        user: '2496347060@qq.com',
        pass: 'ubrpwovhpsluebii',
      },
    });

    const mailOptions = {
      from: '2496347060@qq.com',
      to: email,
      subject: 'personal project email test',
      text: 'Hello world?',
      html: '<b>You have registered in the following web site</b><a href="http://localhost:3000">http://localhost:3000</a>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(info);
    });
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = CryptoJS.MD5(createUserDto.password).toString();
    const existedUser = await this.userRepository.findOneBy({
      userName: createUserDto.userName,
    });
    if (existedUser) {
      return {
        code: 400,
        message: '用户已存在',
      };
    }
    if (createUserDto.email) {
      this.sendEmail(createUserDto.email);
    }
    const createdUser = await this.userRepository.save(createUserDto);
    return {
      code: 201,
      message: 'success',
      token: createdUser.password,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(userName: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ userName });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
