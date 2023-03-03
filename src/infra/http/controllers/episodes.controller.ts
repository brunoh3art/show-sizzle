import { CreateEpisode } from '@application/use-cases/episode/create-episode';
import { DeleteEpisode } from '@application/use-cases/episode/delete-episode';
import { FindManyEpisode } from '@application/use-cases/episode/find-many-episode';
import { GetEpisode } from '@application/use-cases/episode/get-episode';
import { CreateVideo } from '@application/use-cases/video/create-video';
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { EpisodeDTOS } from '../dtos/episode';
import { EpisodeViewModel } from '../view-models/episode-view-model';
import { VideoViewModel } from '../view-models/video-view-model';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private getEpisode: GetEpisode,
    private findManyEpisode: FindManyEpisode,
    private createEpisode: CreateEpisode,
    private deleteEpisode: DeleteEpisode,
    private createVideo: CreateVideo,
  ) {}

  @Get(':id')
  async episodes(@Param('id') id: string, @Query() { skip = 0, take = 50 }) {
    const { total, episodes } = await this.findManyEpisode.execute({ seasonId: id, take, skip });
    return {
      total,
      episodes: episodes.map(EpisodeViewModel.toHTTP),
    };
  }
  @Get('details/:id')
  async episode(@Param('id') id: string) {
    const { episode } = await this.getEpisode.execute({ episodeId: id });
    return {
      episode: EpisodeViewModel.toHTTP(episode),
    };
  }

  @Post()
  async create(@Body() data: EpisodeDTOS) {
    const { title, episode_number, overview, release_date, background_image, seasonId, isPublished, video } = data;

    const { episode } = await this.createEpisode.execute({
      episode: { title, episode_number, overview, release_date, background_image, isPublished },
      seasonId,
    });

    const { video: media } = await this.createVideo.execute({
      type: 'episode',
      format: video.format,
      link: video.link,
      title: video.title,
      id: episode.id,
    });

    return { episode: EpisodeViewModel.toHTTP(episode), video: VideoViewModel.toHTTP(media) };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const episode = await this.deleteEpisode.execute({ episodeId: id });
    return episode;
  }
}