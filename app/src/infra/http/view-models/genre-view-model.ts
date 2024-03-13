import { Genre } from '@application/entities/genre';

export class GenreViewModel {
  static toHTTP(genre: Genre) {
    return {
      id: genre.id,
      title: genre.title,
    };
  }
}
