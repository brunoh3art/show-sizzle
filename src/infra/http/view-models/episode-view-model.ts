import { Episode } from '@application/entities/episode';

export class EpisodeViewModel {
  static toHTTP(episode: Episode) {
    console.log('EpisodeViewModel: ', episode);

    return {
      id: episode.id,
      title: episode.title.value,
      episode_number: episode.episode_number.value,
      overview: episode.overview,
      background_image: episode.background_image,
      release_date: episode.release_date,
      isPublished: episode.isPublished,
    };
  }
}
