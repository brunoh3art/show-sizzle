import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateTvShow } from '@application/use-cases/tvshow/create-tvshow';
import { DeleteTvShow } from '@application/use-cases/tvshow/delete-tvshow';
import { FindManyTvShow } from '@application/use-cases/tvshow/find-many-tvshow';
import { GetTvShow } from '@application/use-cases/tvshow/get-tvshow';
import { UpdateTvShow } from '@application/use-cases/tvshow/update-tvshow';
import { ContentDTO } from '../dtos/content';
import { TvShowViewModel } from '../view-models/tvshow-view-model';

@Controller('tvshows')
export class TvShowsController {
  constructor(
    private readonly createTvShow: CreateTvShow,
    private readonly findManyTvShow: FindManyTvShow,
    private readonly deleteTvShow: DeleteTvShow,
    private readonly getTvShow: GetTvShow,
    private readonly setTvShow: UpdateTvShow,
  ) {}

  @Get()
  async tvshows(@Query() { skip = 0, take = 24 }) {
    const { content, total, page } = await this.findManyTvShow.execute({
      skip: Number(skip),
      take: Number(take),
    });

    return { content: content.map((item) => TvShowViewModel.toHTTP(item)), total, page };
  }

  @Get(':id')
  async tvshow(@Param('id') tvshowId: string) {
    const { content } = await this.getTvShow.execute({
      tvshowId,
    });

    return { content: TvShowViewModel.toHTTP(content) };
  }

  @Post()
  async create(@Body() body: ContentDTO) {
    const { title, original_title, overview, poster_image, background_image, release_date, published, genres } = body;

    const { content } = await this.createTvShow.execute({
      title,
      original_title,
      overview,
      poster_image,
      background_image,
      release_date,
      published,
    });

    return {
      content: TvShowViewModel.toHTTP(content),
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: ContentDTO) {
    const { title, original_title, overview, poster_image, background_image, release_date, published, genres } = body;

    const { content } = await this.setTvShow.execute({
      id,
      title,
      original_title,
      overview,
      poster_image,
      background_image,
      release_date,
      published,
      genres,
    });

    return {
      content: TvShowViewModel.toHTTP(content),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteTvShow.execute({ tvShowId: id });
    return {
      message: 'Movie deleted successfully',
    };
  }
}
