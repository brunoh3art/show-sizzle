import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class SeasonDTOS {
  @IsNotEmpty()
  @Length(3, 240)
  title: string;
  @IsNotEmpty()
  @Length(0)
  season_number: number;
  @IsString()
  season_overview?: string;
  @IsString()
  poster_image?: string;
  @IsString()
  release_date: string;
  @IsBoolean()
  isPublished: boolean;
}
