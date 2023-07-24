import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as CryptoJS from 'crypto-js';
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

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = CryptoJS.MD5(createUserDto.password).toString();
    if (
      await this.userRepository.findOneBy({ userName: createUserDto.userName })
    ) {
      return {
        code: 400,
        message: '用户名已存在',
      };
    }
    const result = await this.userRepository.save(createUserDto);
    return {
      code: 201,
      message: 'success',
      token: result.password,
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
