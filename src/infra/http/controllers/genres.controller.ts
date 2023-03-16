import { FindManyGenre } from '@application/use-cases/genre/find-many-genre';
import { Controller, Get, Query } from '@nestjs/common';
import { GenreViewModel } from '../view-models/genre-view-model';

@Controller('genres')
export class GenresController {
  constructor(private findManyGenre: FindManyGenre) {}

  @Get()
  async getGenres(@Query() { skip = 0, take = 24, genre = '' }) {
    const { total, page, content } = await this.findManyGenre.execute({ skip, take, genre });

    return { total, page, content: content.map(GenreViewModel.toHTTP) };
  }
}
