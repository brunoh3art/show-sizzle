import { Episode, EpisodeNumber, EpisodeTitle } from '@application/entities/episode';
import { Replace } from '@helpers/replace';

import { Episode as PrismaEpisode, Season as PrismaSeason } from '@prisma/client';
import { PrismaSeasonMapper } from './prisma-season-mapper';

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
      id: episode.id,
    };
  }

  static toDomain(episode: Replace<PrismaEpisode, { season?: PrismaSeason }>) {
    return new Episode({
      title: new EpisodeTitle(episode.title),
      episode_number: new EpisodeNumber(episode.episode_number),
      overview: episode.overview,
      background_image: episode.background_image,
      release_date: episode.release_date,
      isPublished: episode.isPublished,
      createdAt: episode.createdAt,
      updatedAt: episode.updatedAt,
      season: PrismaSeasonMapper.toDomain(episode.season),
    });
  }
}
