import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileRepository } from './profile.repository';
import { Profile } from './entities/profile.entity';

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
    return `This action returns all profile`;
  }

  findOne(id: string) {
    return `This action returns a #${id} profile`;
  }

  find(id: string) {
    throw new Error('Method not implemented.');
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
  }
}
