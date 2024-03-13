import { VideoRepository } from '@application/repositories/video-repository';
import { Injectable } from '@nestjs/common';

interface DeleteRequest {
  videoId: string;
}

type DeleteResponse = void;
@Injectable()
export class DeleteVideo {
  constructor(private contentRepository: VideoRepository) {}

  async execute(request: DeleteRequest): Promise<DeleteResponse> {
    const { videoId } = request;

    await this.contentRepository.remove(videoId);
  }
}
