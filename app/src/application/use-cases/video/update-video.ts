import { Video } from '@application/entities/video';
import { VideoRepository } from '@application/repositories/video-repository';
import { Injectable } from '@nestjs/common';

interface UpdateVideoRequest {
  id: string;
  title: string;
  type: string;
  link: string;
  format: string;
}

interface UpdateVideoResponse {
  video: Video;
}

@Injectable()
export class UpdateVideo {
  constructor(private videoRepository: VideoRepository) {}

  async execute(request: UpdateVideoRequest): Promise<UpdateVideoResponse> {
    const { title, type, link, id, format } = request;

    const video = new Video(
      {
        title,
        type,
        link,
        format,
      },
      id,
    );

    await this.videoRepository.save({ videoId: id, content: video });

    return { video };
  }
}
