import { MovieRepository } from '@application/repositories/movie-repository';
import { Injectable } from '@nestjs/common';
import { Content } from '../../entities/content';

interface GetMovieRequest {
  movieId: string;
}

interface GetMovieResponse {
  content: Content;
}
@Injectable()
export class GetMovie {
  constructor(private contentRepository: MovieRepository) {}

  async execute(request: GetMovieRequest): Promise<GetMovieResponse> {
    const { movieId } = request;

    const content = await this.contentRepository.findById(movieId);

    return {
      content: content,
    };
  }
}
