import { MovieRepository } from '@application/repositories/movie-repository';
import { Injectable } from '@nestjs/common';
import { MovieNotFoundException } from '../errors/movie-not-found';

interface DeleteMovieRequest {
  movieId: string;
}

type DeleteMovieResponse = void;
@Injectable()
export class CreateMovie {
  constructor(private contentRepository: MovieRepository) {}

  async execute(request: DeleteMovieRequest): Promise<DeleteMovieResponse> {
    const { movieId } = request;

    const movie = await this.contentRepository.findById(movieId);

    if (!movie) throw new MovieNotFoundException();
  }
}
