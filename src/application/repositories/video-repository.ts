import { Video } from '@application/entities/video';
type VideoProps = {
  videoId: string;
  content: Video;
};
export abstract class VideoRepository {
  abstract findById(videoId: string): Promise<Video | null>;
  abstract create(video: Video): Promise<void>;
  abstract save({ videoId, content }: VideoProps): Promise<void>;
  abstract remove(videoId: string): Promise<void>;
}
