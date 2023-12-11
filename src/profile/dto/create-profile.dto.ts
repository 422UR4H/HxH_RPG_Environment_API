import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  briefDescription: string;

  @IsNotEmpty()
  @IsDateString({ strict: false })
  birthday: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(510)
  avatarUrl: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(510)
  backgroundImgUrl: string;
}
