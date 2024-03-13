import { Content } from '@application/entities/content';
import { Episode } from '@application/entities/episode';
import { Video } from '@application/entities/video';
import { VideoRepository } from '@application/repositories/video-repository';
import { Injectable } from '@nestjs/common';

interface GetVideoRequest {
  videoId: string;
}

interface GetVideoResponse {
  video: Video;
  referece: {
    episode?: Episode | null;
    content: Content;
  };
}
@Injectable()
export class GetVideo {
  constructor(private contentRepository: VideoRepository) {}

  async execute(request: GetVideoRequest): Promise<GetVideoResponse> {
    const { videoId } = request;

    const { video, referece } = await this.contentRepository.findById(videoId);

    return {
      video,
      referece,
    };
  }
}
