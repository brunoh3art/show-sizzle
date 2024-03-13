import { Episode, EpisodeNumber, EpisodeTitle } from '@application/entities/episode';
import { EpisodeRepository } from '@application/repositories/episode-repository';
import { Injectable } from '@nestjs/common';

type EpisodeRequest = {
  title: string;
  episode_number: number;
  overview?: string;
  background_image?: string;
  release_date?: string;
  isPublished?: boolean;
};

interface CreateEpisodeRequest {
  episode: EpisodeRequest;
  seasonId: string;
}

interface CreateEpisodeResponse {
  episode: Episode;
}
@Injectable()
export class CreateEpisode {
  constructor(private episodeRepository: EpisodeRepository) {}

  async execute(request: CreateEpisodeRequest): Promise<CreateEpisodeResponse> {
    const {
      episode: { title, release_date, background_image, episode_number, isPublished, overview },
      seasonId,
    } = request;

    const episode = new Episode({
      title: new EpisodeTitle(title),
      episode_number: new EpisodeNumber(episode_number),
      overview,
      release_date,
      background_image,
      isPublished,
    });

    await this.episodeRepository.create({ episode, seasonId });

    return { episode };
  }
}
