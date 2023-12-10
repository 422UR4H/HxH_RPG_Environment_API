import { Profile } from '@prisma/client';
import { PartialProfile } from '../entities/profile.interface';
import { dateFormat } from '../../../src/utils/dateFormat.utils';

export type OutputProfileType = Omit<PartialProfile, 'birthday'> & {
  birthday: string | Date;
};

export default class OutputProfileDto {
  id: string;
  userId: string;
  characterId: string;
  name: string;
  birthday: string | Date;
  description: string;
  briefDescription: string;
  avatarUrl: string;
  backgroundImgUrl: string;
  created_at: Date;
  updated_at: Date;

  constructor(profile: Profile) {
    this.id = profile.id;
    this.userId = profile.userId;
    this.characterId = profile.characterId;
    this.name = profile.name;
    this.birthday = dateFormat(profile.birthday);
    this.description = profile.description;
    this.briefDescription = profile.briefDescription;
    this.avatarUrl = profile.avatarUrl;
    this.backgroundImgUrl = profile.backgroundImgUrl;
    this.created_at = profile.created_at;
    this.updated_at = profile.updated_at;
  }
}
