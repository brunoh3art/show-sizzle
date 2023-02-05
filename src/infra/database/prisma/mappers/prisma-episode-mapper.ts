import { Episode, EpisodeNumber, EpisodeTitle } from '@application/entities/episode';

import { Episode as PrismaEpisode } from '@prisma/client';

export class PrismaEpisodeMapper {
  static toPrisma(episode: Episode) {
    return {
      title: episode.title.value,
      episode_number: episode.episode_number.value,
      overview: episode.overview,
      background_image: episode.background_image,
      release_date: episode.release_date,
      isPublished: episode.isPublished,
      createdAt: episode.createdAt,
      updatedAt: episode.updatedAt,
    };
  }

  static toDomain(episode: PrismaEpisode) {
    return new Episode({
      title: new EpisodeTitle(episode.title),
      episode_number: new EpisodeNumber(episode.episode_number),
      overview: episode.overview,
      background_image: episode.background_image,
      release_date: episode.release_date,
      isPublished: episode.isPublished,
      createdAt: episode.createdAt,
      updatedAt: episode.updatedAt,
    });
  }
}
