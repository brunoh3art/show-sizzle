import { Content } from '@application/entities/content';
import { Episode } from '@application/entities/episode';
import { Video } from '@application/entities/video';
import { EpisodeViewModel } from './episode-view-model';
import { MovieViewModel } from './movie-view-model';

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

  static toHTTPMetadata({ episode, content }: { episode?: Episode | null; content: Content }) {
    return {
      episode: !!episode && EpisodeViewModel.toHTTP(episode),
      content: MovieViewModel.toHTTP(content),
    };
  }
}
