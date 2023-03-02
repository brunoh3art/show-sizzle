import { Video } from '@application/entities/video';

export class VideoViewModel {
  static toHTTP(video: Video) {
    return {
      title: video.id,
      type: video.type,
      link: video.link,
      format: video.format,
      id: video.id,
    };
  }
}
