import { Content } from '@application/entities/content';
import { Episode } from '@application/entities/episode';
import { Video } from '@application/entities/video';
type VideoProps = {
  videoId: string;
  content: Video;
};
export interface VideoResponse {
  video: Video;
  referece: {
    episode?: Episode | null;
    content: Content;
  };
}
export abstract class VideoRepository {
  abstract findById(videoId: string): Promise<VideoResponse | null>;
  abstract findMany(findManyById: string): Promise<Video[]>;
  abstract create(video: Video): Promise<void>;
  abstract save({ videoId, content }: VideoProps): Promise<void>;
  abstract remove(videoId: string): Promise<void>;
}
