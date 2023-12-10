import { PartialProfile } from "../entities/profile.interface";

export type OutputProfileDto = Omit<PartialProfile, 'birthday'> & {
  birthday: string | Date;
};
