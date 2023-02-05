import { EpisodeRepository } from '@application/repositories/episode-repository';
import { Injectable } from '@nestjs/common';
import { EpisodeFoundException } from '../errors/episode-not-found';

interface DeleteEpisodeRequest {
  episodeId: string;
}

type DeleteEpisodeResponse = void;
@Injectable()
export class DeleteEpisode {
  constructor(private episodeRepository: EpisodeRepository) {}

  async execute(request: DeleteEpisodeRequest): Promise<DeleteEpisodeResponse> {
    const { episodeId } = request;

    const episode = await this.episodeRepository.findById(episodeId);

    if (!episode) throw new EpisodeFoundException();

    await this.episodeRepository.remove(episode.id);
  }
}
