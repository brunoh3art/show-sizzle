import { CreateGenre } from '@application/use-cases/genre/create-genre';
import { FindManyGenre } from '@application/use-cases/genre/find-many-genre';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GenreDTO } from '../dtos/genre';
import { GenreViewModel } from '../view-models/genre-view-model';

@Controller('genres')
export class GenresController {
  constructor(private findManyGenre: FindManyGenre, private createGenre: CreateGenre) {}

  @Get()
  async getGenres(@Query() { skip = 0, take = 24, genre = '' }) {
    const { total, page, content } = await this.findManyGenre.execute({ skip, take, genre });

    return { total, page, content: content.map(GenreViewModel.toHTTP) };
  }

  @Post()
  async create(@Body() body: GenreDTO) {
    const { title } = body;

    const { genre } = await this.createGenre.execute({ title });

    return { genre: GenreViewModel.toHTTP(genre) };
  }
}
