import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { CharactersRepository } from './characters.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [CharactersController],
  providers: [CharactersService, CharactersRepository],
})
export class CharactersModule {}
