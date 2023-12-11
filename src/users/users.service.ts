import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { OutputUserDto } from './dto/output-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<OutputUserDto> {
    const user = await this.usersRepository.create(createUserDto);
    return new OutputUserDto(user);
  }

  async findAll(): Promise<OutputUserDto[]> {
    const user = await this.usersRepository.findAll();
    return user.map((u) => new OutputUserDto(u));
  }

  async findOne(id: string): Promise<OutputUserDto> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return new OutputUserDto(user);
  }

  async findWithProfile(id: string): Promise<OutputUserDto> {
    const result = await this.usersRepository.findWithProfile(id);
    if (!result) throw new NotFoundException('User not found');

    delete result.profile.userId;
    delete result.profile.characterId;
    return new OutputUserDto(result);
  }

  findUserWithPasswordByEmail(email: string): Promise<User> {
    return this.usersRepository.findByEmail(email);
  }

  findUserWithPasswordByNickOrEmail(
    nick: string,
    email: string,
  ): Promise<User> {
    return this.usersRepository.findByNickOrEmail(nick, email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<OutputUserDto> {
    const user = await this.usersRepository.remove(id);
    return new OutputUserDto(user);
  }
}
