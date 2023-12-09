import { Profile } from '@prisma/client';

type PartialProfile = Omit<Profile, 'userId' | 'characterId'>;

export default interface IProfile extends PartialProfile {}
