import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { User } from '../decorators/user.decorator';
import { User as UserType } from '@prisma/client';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createCharacterDto: CreateCharacterDto,
    @User() user: UserType,
  ) {
    return this.charactersService.create(createCharacterDto, user.id);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.charactersService.findAll();
  }

  @Get('profiles')
  @UseGuards(AdminGuard)
  findAllWithProfile() {
    return this.charactersService.findAllWithProfile();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @User() user: UserType) {
    return this.charactersService.findOne(id, user.id, user.role);
  }

  @Get(':id/attribute-test')
  @UseGuards(AuthGuard)
  attributeTest(@Param('id') id: string) {
    return this.charactersService.attributeTest(id);
  }
  // @Param('dice') dice: number

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }
}
