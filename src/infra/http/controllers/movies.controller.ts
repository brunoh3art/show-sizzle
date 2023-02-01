import { CreateMovie } from '@application/use-cases/movie/create-movie';
import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { ContentDTO } from '../dtos/content';
import { MovieViewModel } from '../view-models/movie-view-model';

@Controller('movies')
export class MoviesController {
  constructor(private readonly createMovie: CreateMovie) {}

  @Post()
  async create(@Body() body: ContentDTO) {
    const { title, original_title, overview, poster_image, background_image, release_date, published } = body;

    const { content } = await this.createMovie.execute({
      title,
      original_title,
      overview,
      poster_image,
      background_image,
      release_date,
      published,
    });

    return {
      content: MovieViewModel.toHTTP(content),
    };
  }
}
