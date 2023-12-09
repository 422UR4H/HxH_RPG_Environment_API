import { v4 as uuid } from 'uuid';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { CharactersRepository } from './characters.repository';
import { Role } from '@prisma/client';

@Injectable()
export class CharactersService {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  async create(createCharacterDto: CreateCharacterDto, userId: string) {
    const {
      nick,
      name,
      description,
      briefDescription,
      birthday,
      avatarUrl,
      backgroundImgUrl,
    } = createCharacterDto;

    const result = await this.charactersRepository.findByNick(nick);
    if (!!result) throw new ConflictException('Nick already in use');

    // gerar char id
    const characterId = uuid();
    const formattedBirthday = new Date(birthday);

    const character = new Character(
      userId,
      nick,
      name,
      description,
      briefDescription,
      formattedBirthday,
      avatarUrl,
      backgroundImgUrl,
      characterId,
    );
    return this.charactersRepository.create(character);
  }

  findAll() {
    return this.charactersRepository.findAll();
  }

  findAllWithProfile() {
    return this.charactersRepository.findAllWithProfile();
  }

  async findOne(characterId: string, userId: string, role: Role) {
    let character: Character;
    switch (role) {
      case Role.ADMIN:
        // TODO:
        break;
      case Role.MODERATOR:
        // TODO:
        break;
      case Role.MASTER:
        // TODO: verify if the char belongs to your campaign
        break;
      case Role.ASSISTANT:
        // TODO:
        break;
      case Role.PLAYER:
        const character = await this.charactersRepository.findOne(characterId);
        if (character.userId !== userId) {
          throw new UnauthorizedException('Access Denied!');
        }
        break;
      default:
        throw new UnauthorizedException('Access Denied!');
    }
    return `This action returns a #${characterId} character`;
  }

  update(id: string, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: string) {
    return `This action removes a #${id} character`;
  }
}
