import { User } from '@prisma/client';
import IProfile from 'src/profile/entities/profile.interface';

export default interface IUser extends User {
  profile?: IProfile;
}
