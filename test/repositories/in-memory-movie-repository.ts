import { Content } from '@application/entities/content';
import { MovieRepository } from '@application/repositories/movie-repository';

export class InMemoryMovieRepository implements MovieRepository {
  findById(content: string): Promise<Content> {
    throw new Error('Method not implemented.');
  }
  public movies: Content[] = [];

  async create(content: Content) {
    this.movies.push(content);
  }
}
