import { Content } from '@application/entities/content';
import { MovieRepository, MovieResponse } from '@application/repositories/movie-repository';

export class InMemoryMovieRepository implements MovieRepository {
  findMany(skip: number, take: number): Promise<MovieResponse> {
    throw new Error('Method not implemented.');
  }
  findById(content: string): Promise<Content> {
    throw new Error('Method not implemented.');
  }
  public movies: Content[] = [];

  async create(content: Content) {
    this.movies.push(content);
  }

  save(movieId: string, content: Content): Promise<void> {
    throw new Error('Method not implemented.');
  }
  remove(content: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
