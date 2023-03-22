import { Content, Title } from '@application/entities/content';
import { Genre } from '@application/entities/genre';
import { Replace } from '@helpers/replace';
import { Movie, Genre as PrismaGenre, TvShow } from '@prisma/client';

export class PrismaContentMapper {
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

  static toDomain(
    content: Replace<Movie, { genres?: PrismaGenre[] }> | Replace<TvShow, { genres?: PrismaGenre[] }>,
  ): Content {
    return new Content(
      {
        title: new Title(content.title),
        original_title: new Title(content.original_title),
        overview: content.overview,
        release_date: content.release_date,
        poster_image: content.poster_image,
        background_image: content.background_image,
        published: content.published,
        genres: content.genres.map(
          (genre) =>
            new Genre(
              {
                title: genre.title,
                createdAt: genre.createdAt,
                updatedAt: genre.updatedAt,
              },
              genre.id,
            ),
        ),
        createdAt: content.createdAt,
        updatedAt: content.updatedAt,
      },
      content.id,
    );
  }
}
