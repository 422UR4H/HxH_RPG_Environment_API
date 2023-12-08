import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  nick: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(32)
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
  @MaxLength(32)
  password: string;

  @IsEnum(Role)
  // @IsString()
  @IsNotEmpty()
  role: Role;
}
