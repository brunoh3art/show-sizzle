import { IsNotEmpty } from 'class-validator';

export class VideoDTOS {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  link: string;
  @IsNotEmpty()
  format: string;
}
