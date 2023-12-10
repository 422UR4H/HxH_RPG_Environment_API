import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '../../src/guards/auth.guard';
import { AdminGuard } from '../../src/guards/admin.guard';
import { User as UserType } from '@prisma/client';
import { User } from '../../src/decorators/user.decorator';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createProfileDto: CreateProfileDto, @User() user: UserType) {
    return this.profileService.create(createProfileDto, user.id);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @User() user: UserType) {
    return this.profileService.findOne(id, user.id, user.role);
  }

  @Patch()
  @UseGuards(AuthGuard)
  update(@User() user: UserType, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(user.id, updateProfileDto);
  }
}
