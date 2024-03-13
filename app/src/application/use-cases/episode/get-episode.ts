import { Episode } from '@application/entities/episode';
import { EpisodeRepository } from '@application/repositories/episode-repository';
import { Injectable } from '@nestjs/common';

interface GetEpisodeRequest {
  episodeId: string;
}

interface GetEpisodeResponse {
  episode: Episode;
}
@Injectable()
export class GetEpisode {
  constructor(private episodeRepository: EpisodeRepository) {}

  async execute(request: GetEpisodeRequest): Promise<GetEpisodeResponse> {
    const { episodeId } = request;

    const episode = await this.episodeRepository.findById(episodeId);

    return {
      episode: episode,
    };
  }
}
