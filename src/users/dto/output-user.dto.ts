import { User } from '@prisma/client';

export class OutputUserDto {
  id: string;
  nick: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.nick = user.nick;
    this.email = user.email;
  }
}
