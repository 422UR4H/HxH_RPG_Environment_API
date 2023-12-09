import { Role, User } from '@prisma/client';

export class OutputUserDto {
  id: string;
  nick: string;
  email: string;
  role: Role;
  created_at: Date;
  updated_at: Date;

  constructor(user: User) {
    this.id = user.id;
    this.nick = user.nick;
    this.email = user.email;
    this.role = user.role;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}
