import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';
import IProfile from './entities/profile.interface';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createProfileDto: IProfile, userId: string): Promise<Profile> {
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

  findAll(): Promise<Profile[]> {
    // TODO: pagination this
    return this.prisma.profile.findMany();
  }

  findOne(id: string): Promise<Profile> {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  findByUserId(userId: string): Promise<Profile> {
    return this.prisma.profile.findUnique({ where: { userId } });
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }
}
