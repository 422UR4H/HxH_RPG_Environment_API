import { Character } from '@prisma/client';
import IProfile from 'src/profile/entities/profile.interface';

export default interface ICharacter extends Character {
  profile?: IProfile;
  attributeTest(): number;
}
