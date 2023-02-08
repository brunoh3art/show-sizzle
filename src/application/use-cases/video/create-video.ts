import { Video } from '@application/entities/video';
import { VideoRepository } from '@application/repositories/video-repository';
import { Injectable } from '@nestjs/common';

interface CreateVideoRequest {
  id: string;
  title: string;
  type: string;
  link: string;
  format: string;
}

interface CreateVideoResponse {
  video: Video;
}

@Injectable()
export class CreateVideo {
  constructor(private contentRepository: VideoRepository) {}

  async execute(request: CreateVideoRequest): Promise<CreateVideoResponse> {
    const { title, type, link, id, format } = request;

    const video = new Video({
      title,
      type,
      link,
      id,
      format,
    });

    await this.contentRepository.create(video);

    return { video };
  }
}
