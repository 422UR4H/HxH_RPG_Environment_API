import { Injectable } from '@nestjs/common';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Character } from './entities/character.entity';

@Injectable()
export class CharactersRepository {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: type this
  async create(character: Character) {
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
        userId,
        name,
        description,
        briefDescription,
        birthday,
        avatarUrl,
        backgroundImgUrl,
      },
    });
    const result = await this.prisma.$transaction([newCharacter, profile]);
    return result;
  }

  findAll() {
    return this.prisma.character.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} character`;
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
