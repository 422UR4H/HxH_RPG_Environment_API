import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(12)
  nick: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description: string;

  @IsString()
  @IsOptional()
  @MaxLength(64)
  briefDescription: string;

  @IsNotEmpty()
  @IsDateString({ strict: false })
  birthday: Date;

  @IsUrl()
  @IsNotEmpty()
  @MaxLength(510)
  avatarUrl: string;

  @IsUrl()
  @IsNotEmpty()
  @MaxLength(510)
  backgroundImgUrl: string;
}
