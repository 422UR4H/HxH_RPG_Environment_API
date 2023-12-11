import { v4 as uuid } from 'uuid';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { Character as CharacterType } from '@prisma/client';
import { CharactersRepository } from './characters.repository';
import { Role } from '@prisma/client';
import { OutputCharacterDto } from './dto/output-character.dto';
import ICharacter from './entities/character.interface';

@Injectable()
export class CharactersService {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  async create(
    createCharacterDto: CreateCharacterDto,
    userId: string,
  ): Promise<OutputCharacterDto> {
    const { nick, birthday } = createCharacterDto;
    const result = await this.charactersRepository.findByNick(nick);
    if (!!result) throw new ConflictException('Nick already in use');

    const characterId = uuid();
    const formattedBirthday = new Date(birthday);
    const character = new Character(
      userId,
      nick,
      createCharacterDto.name,
      createCharacterDto.description,
      createCharacterDto.briefDescription,
      formattedBirthday,
      createCharacterDto.avatarUrl,
      createCharacterDto.backgroundImgUrl,
      characterId,
    );
    const [user, profile] = await this.charactersRepository.create(character);
    return new OutputCharacterDto(user as ICharacter, profile);
  }

  findAll(): Promise<CharacterType[]> {
    return this.charactersRepository.findAll();
  }

  async findAllWithProfile(): Promise<OutputCharacterDto[]> {
    const result = await this.charactersRepository.findAllWithProfile();
    return result.map((char) => new OutputCharacterDto(char));
  }

  async findOne(
    characterId: string,
    userId: string,
    role: Role,
  ): Promise<OutputCharacterDto> {
    const character = await this.charactersRepository.findOne(characterId);
    if (!character) throw new NotFoundException('Character not found');

    delete character.profile.userId;
    delete character.profile.characterId;
    const outputCharacterDto = new OutputCharacterDto(character);
    return this.checkRole(outputCharacterDto, userId, role);
  }

  async attributeTest(id: string): Promise<number> {
    const result = await this.charactersRepository.findOne(id);
    if (!result?.profile) {
      throw new ForbiddenException('Character profile not found');
    }
    const character = new Character(
      result.userId,
      result.nick,
      result.profile.name,
      result.profile.description,
      result.profile.briefDescription,
      result.profile.birthday,
      result.profile.avatarUrl,
      result.profile.backgroundImgUrl,
    );
    return character.attributeTest();
  }

  update(id: string, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: string) {
    return `This action removes a #${id} character`;
  }

  private checkRole(
    character: OutputCharacterDto,
    userId: string,
    role: Role,
  ): OutputCharacterDto {
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
          throw new UnauthorizedException('Access Denied!');
        }
        return character;
      default:
        throw new UnauthorizedException('Access Denied!');
    }
  }
}
