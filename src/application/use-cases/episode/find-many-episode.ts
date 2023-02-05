import { Episode } from '@application/entities/episode';
import { EpisodeRepository } from '@application/repositories/episode-repository';
import { Injectable } from '@nestjs/common';

interface FindManyEpisodeRequest {
  skip?: number;
  take: number;
}

type FindManyEpisodeResponse = {
  total: number;
  episodes: Episode[];
};
@Injectable()
export class FindManyEpisode {
  constructor(private episodeRepository: EpisodeRepository) {}

  async execute(request: FindManyEpisodeRequest): Promise<FindManyEpisodeResponse> {
    const { skip, take } = request;

    const { episodes, total } = await this.episodeRepository.findMany(skip, take);

    return {
      episodes: episodes,
      total: total,
    };
  }
}
