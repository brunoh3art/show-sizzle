import { Content } from '@application/entities/content';
import { GenreViewModel } from './genre-view-model';

export class MovieViewModel {
  static toHTTP(content: Content) {
    return {
      id: content.id,
      title: content.title.value,
      original_title: content.original_title.value,
      overview: content.overview,
      poster_image: content.poster_image,
      background_image: content.background_image,
      release_date: content.release_date,
      published: content.published,
      genres: content.genres && content?.genres.map(GenreViewModel.toHTTP),
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
    };
  }
}
