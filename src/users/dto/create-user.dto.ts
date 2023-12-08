import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nick: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    // minLength: 8,
    minLength: 3,
    // minLowercase: 1,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  // @IsString()
  @IsNotEmpty()
  role: Role;
}
