import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { OutputUserDto } from '../users/dto/output-user.dto';

// const EXPIRATION_TIME = '7 days';
const SALT = 10;
const ISSUER = 'hxh-environment';
const AUDIENCE = 'users';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<OutputUserDto> {
    const { nick, email, password } = signUpDto;
    const user = await this.usersService.findByNickOrEmail(nick, email);

    const words: string[] = [];
    if (!!user) {
      if (user.nick === nick) words.push('Nick');
      if (user.email === email) words.push('Email');

      let message = '';
      if (words.length > 1) {
        message = words.join(' and ');
      } else {
        message = words[0];
      }
      throw new ConflictException(message.concat(' already in use'));
    }
    signUpDto.password = bcrypt.hashSync(password, SALT);

    return this.usersService.create(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email or password is not valid');
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('Email or password is not valid');
    }
    return this.createToken(user);
  }

  createToken(user: User) {
    const { id, nick, role } = user;
    const token = this.jwtService.sign(
      { nick, role },
      {
        // expiresIn: EXPIRATION_TIME,
        subject: id,
        issuer: ISSUER,
        audience: AUDIENCE,
      },
    );
    return { token, user: new OutputUserDto(user) };
  }

  checkToken(token: string) {
    const data = this.jwtService.verify(token, {
      audience: AUDIENCE,
      issuer: ISSUER,
    });
    return data;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
