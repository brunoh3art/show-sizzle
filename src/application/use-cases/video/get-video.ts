import { Video } from '@application/entities/video';
import { VideoRepository } from '@application/repositories/video-repository';
import { Injectable } from '@nestjs/common';

interface GetVideoRequest {
  videoId: string;
}

interface GetVideoResponse {
  video: Video;
}
@Injectable()
export class GetVideo {
  constructor(private contentRepository: VideoRepository) {}

  async execute(request: GetVideoRequest): Promise<GetVideoResponse> {
    const { videoId } = request;

    const video = await this.contentRepository.findById(videoId);

    return {
      video,
    };
  }
}
