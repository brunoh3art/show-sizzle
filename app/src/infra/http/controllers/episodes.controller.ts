import { CreateEpisode } from '@application/use-cases/episode/create-episode';
import { DeleteEpisode } from '@application/use-cases/episode/delete-episode';
import { FindManyEpisode } from '@application/use-cases/episode/find-many-episode';
import { GetEpisode } from '@application/use-cases/episode/get-episode';
import { UpdateEpisode } from '@application/use-cases/episode/update-episode';
import { CreateVideo } from '@application/use-cases/video/create-video';
import { GetVideo } from '@application/use-cases/video/get-video';
import { UpdateVideo } from '@application/use-cases/video/update-video';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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
    private updateVideo: UpdateVideo,
    private updateEpisode: UpdateEpisode,
    //video
    private getVideo: GetVideo,
  ) {}

  @Get(':id')
  async episodes(@Param('id') id: string, @Query() { skip = 0, take = 50 }) {
    const { total, episodes } = await this.findManyEpisode.execute({
      seasonId: id,
      take: Number(take),
      skip: Number(skip),
    });
    return {
      total,
      episodes: episodes.map(EpisodeViewModel.toHTTP),
    };
  }
  @Get(':id/details')
  async episode(@Param('id') id: string) {
    const [{ episode }, { video }] = await Promise.all([
      this.getEpisode.execute({ episodeId: id }),
      this.getVideo.execute({ videoId: id }).catch((err) => {
        console.log('video', { err });
        return {
          video: null,
        };
      }),
    ]);

    console.log({ episode, video });

    return {
      episode: EpisodeViewModel.toHTTP(episode),
      video: video && VideoViewModel.toHTTP(video),
    };
  }

  @Post(':id')
  async create(@Param('id') id: string, @Body() data: EpisodeDTOS) {
    const { title, episode_number, overview, release_date, background_image, isPublished, video } = data;

    const { episode } = await this.createEpisode.execute({
      episode: { title, episode_number, overview, release_date, background_image, isPublished },
      seasonId: id,
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: EpisodeDTOS) {
    const { title, episode_number, overview, release_date, background_image, isPublished, video } = data;

    const { episode } = await this.updateEpisode.execute({
      episode: { title, episode_number, overview, release_date, background_image, isPublished },
      video: {
        type: 'episode',
        format: video.format,
        link: video.link,
        title: video.title,
      },
      episodeId: id,
    });

    return { episode: EpisodeViewModel.toHTTP(episode) };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const episode = await this.deleteEpisode.execute({ episodeId: id });
    return episode;
  }
}
