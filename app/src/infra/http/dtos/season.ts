import { IsBoolean, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class SeasonDTOS {
  @IsNotEmpty()
  @Length(3, 240)
  title: string;
  @IsNotEmpty()
  @IsNumber()
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
