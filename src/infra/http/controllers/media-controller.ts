import { Body, Controller, Post } from '@nestjs/common';

import { CreateVideo } from '@application/use-cases/video/create-video';
import { VideoDTOS } from '../dtos/video';

@Controller('media')
export class MediaController {
  constructor(private readonly createVideo: CreateVideo) {}

  @Post()
  async create(@Body() body: VideoDTOS) {
    const { title, link, format } = body;

    const { video: myVideo } = await this.createVideo.execute({
      id: 'content.id',
      type: 'movie',
      title,
      format,
      link,
    });

    return { myVideo };
  }
}
