import { $Enums } from '@prisma/client';
import IUser from './user.interface';
import IProfile from 'src/profile/entities/profile.interface';

export class User implements IUser {
  private _id: string;
  private _nick: string;
  private _email: string;
  private _password: string;
  private _role: $Enums.Role;
  private _created_at: Date;
  private _updated_at: Date;
  private _profile?: IProfile;

  constructor(
    nick: string,
    email: string,
    password: string,
    role: $Enums.Role,
    profile: IProfile,
  ) {
    this._nick = nick;
    this._email = email;
    this._password = password;
    this._role = role;

    if (!!profile) {
      this._profile = profile;
    }
  }

  get id(): string {
    return this._id;
  }
  get nick(): string {
    return this._nick;
  }
  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }
  get role(): $Enums.Role {
    return this._role;
  }
  get created_at(): Date {
    return this._created_at;
  }
  get updated_at(): Date {
    return this._updated_at;
  }
  get profile(): IProfile {
    return this._profile;
  }
}
