import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { OutputUserDto } from './dto/output-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    // const { nick, email, password, role } = createUserDto;
    // const user = new User(nick, email, password, role);
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

  // FIXME: not found must protected because passwords are sent
  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    // TODO: verify validator here
    // if (!user) {
    //   throw new NotFoundException();
    // }
    return user;
  }

  // FIXME: not found must protected because passwords are sent
  async findByNickOrEmail(nick: string, email: string) {
    const user = await this.usersRepository.findByNickOrEmail(nick, email);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<OutputUserDto> {
    const user = await this.usersRepository.remove(id);
    return new OutputUserDto(user);
  }
}
