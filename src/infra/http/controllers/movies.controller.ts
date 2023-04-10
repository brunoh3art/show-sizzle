import { CreateMovie } from '@application/use-cases/movie/create-movie';
import { FindManyMovie } from '@application/use-cases/movie/find-many-movie';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { Role } from '@application/enums/role.enum';
import { DeleteMovie } from '@application/use-cases/movie/delete-movie';
import { GetMovie } from '@application/use-cases/movie/get-movie';
import { UpdateMovie } from '@application/use-cases/movie/update-movie';
import { CreateVideo } from '@application/use-cases/video/create-video';
import { GetVideo } from '@application/use-cases/video/get-video';
import { Roles } from '@infra/decorators/roles.decorator';
import { MovieDTO } from '../dtos/movie';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
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
    private readonly getVideo: GetVideo,
    private readonly updateMovie: UpdateMovie,
  ) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
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
    const [{ content }, { video }] = await Promise.all<any>([
      this.getMovie.execute({ movieId }),
      this.getVideo.execute({ videoId: movieId }).catch((err) => {
        console.log({ err });
        return {
          video: null,
        };
      }),
    ]);

    return { content: MovieViewModel.toHTTP(content), video: video && VideoViewModel.toHTTP(video) };
  }

  @Post()
  async create(@Body() body: MovieDTO) {
    const { title, original_title, overview, poster_image, background_image, release_date, published, genres, video } =
      body;

    const { content } = await this.createMovie.execute({
      title,
      original_title,
      overview,
      poster_image,
      background_image,
      release_date,
      published,
      genres,
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: MovieDTO) {
    const { title, original_title, overview, poster_image, background_image, release_date, published, genres, video } =
      body;

    const { content } = await this.updateMovie.execute({
      id,
      title,
      original_title,
      overview,
      poster_image,
      background_image,
      release_date,
      published,
      genres,
      video: {
        type: 'movie',
        title: video.title,
        format: video.format,
        link: video.link,
      },
    });
    return { content };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteMovie.execute({ movieId: id });
    return {
      message: 'Movie deleted successfully',
    };
  }
}
