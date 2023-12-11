import { Injectable } from '@nestjs/common';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Character } from './entities/character.entity';

@Injectable()
export class CharactersRepository {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: type this
  create(character: Character) {
    const {
      id,
      userId,
      nick,
      name,
      description,
      briefDescription,
      birthday,
      avatarUrl,
      backgroundImgUrl,
    } = character;

    const newCharacter = this.prisma.character.create({
      data: { userId, id, nick },
    });
    const profile = this.prisma.profile.create({
      data: {
        characterId: id,
        name,
        description,
        briefDescription,
        birthday,
        avatarUrl,
        backgroundImgUrl,
      },
    });
    return this.prisma.$transaction([newCharacter, profile]);
  }

  findAll() {
    return this.prisma.character.findMany();
  }

  findAllWithProfile() {
    return this.prisma.character.findMany({ include: { profile: true } });
  }

  findOne(id: string) {
    return this.prisma.character.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  findByNick(nick: string) {
    return this.prisma.character.findUnique({ where: { nick } });
  }

  update(id: string, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: string) {
    return `This action removes a #${id} character`;
  }
}
