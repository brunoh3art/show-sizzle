import { Episode, EpisodeNumber, EpisodeTitle } from '@application/entities/episode';
import { EpisodeRepository } from '@application/repositories/episode-repository';
import { Injectable } from '@nestjs/common';
import { UpdateVideo } from '../video/update-video';

interface UpdateVideoRequest {
  title: string;
  type: string;
  link: string;
  format: string;
}

type EpisodeRequest = {
  title: string;
  episode_number: number;
  overview?: string;
  background_image?: string;
  release_date?: string;
  isPublished?: boolean;
};

interface UpdateEpisodeRequest {
  episode: EpisodeRequest;
  video: UpdateVideoRequest;
  episodeId: string;
}

interface UpdateEpisodeResponse {
  episode: Episode;
}
@Injectable()
export class UpdateEpisode {
  constructor(private episodeRepository: EpisodeRepository, private updateCaseVideo: UpdateVideo) {}

  async execute(request: UpdateEpisodeRequest): Promise<UpdateEpisodeResponse> {
    const {
      episode: { title, release_date, background_image, episode_number, isPublished, overview },
      episodeId,
      video,
    } = request;
    const { createdAt } = await this.episodeRepository.findById(episodeId);

    const episode = new Episode(
      {
        title: new EpisodeTitle(title),
        episode_number: new EpisodeNumber(episode_number),
        overview,
        release_date,
        background_image,
        isPublished,
        createdAt,
      },
      episodeId,
    );

    await this.episodeRepository.save(episodeId, episode);
    await this.updateCaseVideo.execute({ ...video, id: episodeId });

    return { episode };
  }
}
