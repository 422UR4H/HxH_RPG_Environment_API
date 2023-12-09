import { Character } from '@prisma/client';

export default interface ICharacter extends Character {
  attributeTest(): number;
}
