import { Genre } from '@application/entities/genre';
import { GenreRepository } from '@application/repositories/genre-repository';
import { Injectable } from '@nestjs/common';

interface GetManyGenreRequest {
  skip: number;
  take: number;
  genre?: string;
}
interface FindManyGenreResponse {
  page: number;
  total: number;
  content: Genre[];
}

@Injectable()
export class FindManyGenre {
  constructor(private genreRepository: GenreRepository) {}

  async execute(request: GetManyGenreRequest): Promise<FindManyGenreResponse> {
    const { skip, genre, take } = request;

    const { total, content } = await this.genreRepository.findMany({ skip, take, genre });

    return {
      content: content,
      total: total,
      page: skip,
    };
  }
}
