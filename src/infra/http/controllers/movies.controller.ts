import { CreateMovie } from '@application/use-cases/movie/create-movie';
import { FindManyMovie } from '@application/use-cases/movie/find-many-movie';
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { DeleteMovie } from '@application/use-cases/movie/delete-movie';
import { GetMovie } from '@application/use-cases/movie/get-movie';
import { CreateVideo } from '@application/use-cases/video/create-video';
import { MovieDTO } from '../dtos/movie';
import { MovieViewModel } from '../view-models/movie-view-model';
import { VideoViewModel } from '../view-models/video-view-model';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly createMovie: CreateMovie,
    private readonly findManyMovie: FindManyMovie,
    private readonly deleteMovie: DeleteMovie,
    private readonly getMovie: GetMovie,
    private readonly createVideo: CreateVideo,
  ) {}

  @Get()
  async movies(@Query() { skip = 0, take = 24 }) {
    const { content, total, page } = await this.findManyMovie.execute({
      skip: Number(skip),
      take: Number(take),
    });

    return { content: content.map((item) => MovieViewModel.toHTTP(item)), total, page };
  }

  @Get(':id')
  async movie(@Param('id') movieId: string) {
    const { content } = await this.getMovie.execute({
      movieId,
    });

    return { content: MovieViewModel.toHTTP(content) };
  }

  @Post()
  async create(@Body() body: MovieDTO) {
    const { title, original_title, overview, poster_image, background_image, release_date, published, video } = body;

    const { content } = await this.createMovie.execute({
      title,
      original_title,
      overview,
      poster_image,
      background_image,
      release_date,
      published,
    });

    const { video: media } = await this.createVideo.execute({
      id: content.id,
      type: 'movie',
      title: video.title,
      format: video.format,
      link: video.link,
    });

    return {
      content: MovieViewModel.toHTTP(content),
      video: VideoViewModel.toHTTP(media),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteMovie.execute({ movieId: id });
    return {
      message: 'Movie deleted successfully',
    };
  }
}
