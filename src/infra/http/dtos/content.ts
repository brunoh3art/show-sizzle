import { IsBoolean, IsNotEmpty, Length } from 'class-validator';

export class ContentDTO {
  @IsNotEmpty()
  @Length(3, 240)
  title: string;
  @IsNotEmpty()
  @Length(1, 240)
  original_title: string;
  overview?: string;
  @IsNotEmpty()
  release_date: string;
  poster_image?: string;
  background_image?: string;
  @IsBoolean()
  published: boolean;
  genres?: string[];
}
