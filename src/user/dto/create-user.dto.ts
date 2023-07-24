import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
