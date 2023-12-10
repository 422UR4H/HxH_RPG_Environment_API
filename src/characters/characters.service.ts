import { v4 as uuid } from 'uuid';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { CharactersRepository } from './characters.repository';
import { Role } from '@prisma/client';
import { Character as CharacterType } from '@prisma/client';
import { OutputCharacterDto } from './dto/output-character.dto';
import ICharacter from './entities/character.interface';

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
    const [user, profile] = await this.charactersRepository.create(character);
    return new OutputCharacterDto(user as ICharacter, profile);
  }

  findAll() {
    return this.charactersRepository.findAll();
  }

  async findAllWithProfile() {
    const result = await this.charactersRepository.findAllWithProfile();
    return result.map((char) => new OutputCharacterDto(char));
  }

  async findOne(characterId: string, userId: string, role: Role) {
    let character = await this.charactersRepository.findOne(characterId);
    if (!character) throw new NotFoundException('Character not found');

    delete character.profile.userId;
    delete character.profile.characterId;
    const outputCharacterDto = new OutputCharacterDto(character);
    return this.checkRole(outputCharacterDto, userId, role);
  }

  update(id: string, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: string) {
    return `This action removes a #${id} character`;
  }

  private checkRole(character: OutputCharacterDto, userId: string, role: Role) {
    switch (role) {
      case Role.ADMIN:
        return character;
      case Role.MODERATOR:
        // TODO: verify if the char belongs to your cenary
        return character;
      case Role.MASTER:
        // TODO: verify if the char belongs to your campaign
        return character;
      case Role.ASSISTANT:
        // TODO: verify if the char belongs to your campaign
        return character;
      case Role.PLAYER:
        // TODO: implements verify
        if (character.userId !== userId) {
          console.log(character.userId)
          console.log(userId)
          throw new UnauthorizedException('Access Denied!');
        }
        return character;
      default:
        throw new UnauthorizedException('Access Denied!');
    }
  }
}
