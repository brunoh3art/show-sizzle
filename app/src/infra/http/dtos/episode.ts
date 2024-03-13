import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { VideoDTOS } from './video';

export class EpisodeDTOS {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  @IsNumber()
  episode_number: number;
  overview?: string;
  background_image?: string;
  release_date?: string;
  @IsBoolean()
  isPublished: boolean;
  video: VideoDTOS;
}
