import { Character } from '@prisma/client';
import { OutputProfileDto } from 'src/profile/dto/output-profile.dto';
import IProfile from 'src/profile/entities/profile.interface';
import { dateFormat } from 'src/utils/dateFormat.utils';

export class OutputCharacterDto {
  id: string;
  userId: string;
  nick: string;
  created_at: Date;
  updated_at: Date;
  profile: OutputProfileDto;
  exp?: number;

  constructor(character: Character, profile: IProfile) {
    this.id = character.id;
    this.nick = character.nick;
    this.exp = character.exp;
    this.created_at = character.created_at;
    this.updated_at = character.updated_at;
    this.profile = profile;
    this.profile.birthday = dateFormat(this.profile.birthday)
  }
}
