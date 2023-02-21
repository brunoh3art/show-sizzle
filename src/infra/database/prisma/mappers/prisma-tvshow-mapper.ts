import { Content, Title } from '@application/entities/content';
import { TvShow } from '@prisma/client';

export class PrismaTvShowMapper {
  static toPrisma(content: Content) {
    return {
      id: content.id,
      title: content.title.value,
      original_title: content.original_title.value,
      overview: content.overview,
      release_date: content.release_date,
      poster_image: content.poster_image,
      background_image: content.background_image,
      published: content.published,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
    };
  }

  static toDomain(content: TvShow): Content {
    return new Content(
      {
        title: new Title(content.title),
        original_title: new Title(content.original_title),
        overview: content.overview,
        release_date: content.release_date,
        poster_image: content.poster_image,
        background_image: content.background_image,
        published: content.published,
        createdAt: content.createdAt,
        updatedAt: content.updatedAt,
      },
      content.id,
    );
  }
}
