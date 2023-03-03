import { Controller, Get, Param } from '@nestjs/common';

import { GetVideo } from '@application/use-cases/video/get-video';
import { VideoViewModel } from '../view-models/video-view-model';

@Controller('media')
export class MediaController {
  constructor(private readonly getMedia: GetVideo) {}

  @Get(':id')
  async watch(@Param('id') videoId: string) {
    const { video, referece } = await this.getMedia.execute({ videoId });

    return {
      video: VideoViewModel.toHTTP(video),
      referece: VideoViewModel.toHTTPMetadata(referece),
    };
  }
}
