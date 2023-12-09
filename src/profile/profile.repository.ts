import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import IProfile from './entities/profile.interface';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createProfileDto: IProfile, userId: string) {
    return this.prisma.profile.create({
      data: {
        birthday: createProfileDto.birthday,
        name: createProfileDto.name,
        avatarUrl: createProfileDto.avatarUrl,
        backgroundImgUrl: createProfileDto.backgroundImgUrl,
        briefDescription: createProfileDto.briefDescription,
        description: createProfileDto.description,

        user: { connect: { id: userId } },
      },
    });
  }

  findAll() {
    // TODO: pagination this
    return this.prisma.profile.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} profile`;
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
  }
}
