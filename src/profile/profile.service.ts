import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileRepository } from './profile.repository';
import { Profile as ProfileType } from '@prisma/client';
import { Profile } from './entities/profile.entity';
import { Role } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly profilesRepository: ProfileRepository) {}

  create(createProfileDto: CreateProfileDto, userId: string) {
    const {
      name,
      birthday,
      description,
      briefDescription,
      avatarUrl,
      backgroundImgUrl,
    } = createProfileDto;

    const profile = new Profile(
      name,
      description,
      briefDescription,
      new Date(birthday),
      avatarUrl,
      backgroundImgUrl,
    );
    return this.profilesRepository.create(profile, userId);
  }

  findAll() {
    return this.profilesRepository.findAll();
  }

  async findOne(profileId: string, userId: string, role: Role) {
    const profile = await this.profilesRepository.findOne(profileId);
    return this.checkRole(profile, userId, role)
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
  }

  private checkRole(profile: ProfileType, userId: string, role: Role) {
    switch (role) {
      case Role.ADMIN:
        return profile;
      case Role.MODERATOR:
        // TODO: verify if the char belongs to your cenary
        return profile;
      case Role.MASTER:
        // TODO: verify if the char belongs to your campaign
        return profile;
      case Role.ASSISTANT:
        // TODO: verify if the char belongs to your campaign
        return profile;
      case Role.PLAYER:
        // TODO: improve verify
        if (profile.userId !== userId) {
          throw new UnauthorizedException('Access Denied!');
        }
        return profile;
      default:
        throw new UnauthorizedException('Access Denied!');
    }
  }
}
