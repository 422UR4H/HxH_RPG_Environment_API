import { Role } from '@prisma/client';
import IProfile from 'src/profile/entities/profile.interface';
import IUser from '../entities/user.interface';

export class OutputUserDto {
  id: string;
  nick: string;
  email: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
  profile?: IProfile;

  constructor(user: IUser /*, profile?: IProfile*/) {
    this.id = user.id;
    this.nick = user.nick;
    this.email = user.email;
    this.role = user.role;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
    if (!!user.profile) {
      this.profile = user.profile;
    }
    // this.profile = profile;
  }
}
