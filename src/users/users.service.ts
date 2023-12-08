import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    // const { nick, email, password, role } = createUserDto;
    // const user = new User(nick, email, password, role);
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
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

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
