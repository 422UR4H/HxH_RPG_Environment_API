import { Character } from '@prisma/client';
import IProfile from 'src/profile/entities/profile.interface';

export class OutputCharacterDto {
  id: string;
  userId: string;
  nick: string;
  created_at: Date;
  updated_at: Date;
  // name: string;
  // description: string;
  // briefDescription: string;
  // birthday: Date;
  // avatarUrl: string;
  // backgroundImgUrl: string;
  profile: IProfile;
  exp?: number;

  constructor(character: Character, profile: IProfile) {
    this.id = character.id;
    this.nick = character.nick;
    this.exp = character.exp;
    this.created_at = character.created_at;
    this.updated_at = character.updated_at;
    this.profile = profile;
    // this.birthday = dateFormat(character.birthday);
  }
}
