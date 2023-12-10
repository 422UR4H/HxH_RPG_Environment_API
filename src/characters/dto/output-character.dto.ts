import { Character } from '@prisma/client';
import { OutputProfileType } from 'src/profile/dto/output-profile.dto';
import { dateFormat } from 'src/utils/dateFormat.utils';
import ICharacter from '../entities/character.interface';
import IProfile from 'src/profile/entities/profile.interface';

type CharacterWithProfile = Character & {
  profile: IProfile;
};

export class OutputCharacterDto {
  id: string;
  userId: string;
  nick: string;
  created_at: Date;
  updated_at: Date;
  profile: OutputProfileType;
  exp?: number;

  constructor(
    character: CharacterWithProfile | ICharacter,
    profile?: IProfile,
  ) {
    this.id = character.id;
    this.userId = character.userId;
    this.nick = character.nick;
    this.exp = character.exp;
    this.created_at = character.created_at;
    this.updated_at = character.updated_at;

    const prof = profile || character?.profile;
    if (!!prof) {
      this.profile = prof;
      this.profile.birthday = dateFormat(prof.birthday);
    }
  }
}
