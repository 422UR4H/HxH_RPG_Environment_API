import { v4 as uuid } from 'uuid';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { CharactersRepository } from './characters.repository';

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
    return `This action returns all characters`;
  }

  findOne(id: string) {
    return `This action returns a #${id} character`;
  }

  update(id: string, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: string) {
    return `This action removes a #${id} character`;
  }
}
