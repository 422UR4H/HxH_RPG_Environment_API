import { Profile } from '@prisma/client';

export type PartialProfile = Omit<Profile, 'userId' | 'characterId'>;

export default interface IProfile extends PartialProfile {}
