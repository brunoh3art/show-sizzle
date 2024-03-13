import { Genre } from '@application/entities/genre';
import { Genre as PrismaGenre } from '@prisma/client';

export class PrismaGenreMapper {
  static toDomain(genre: PrismaGenre) {
    return new Genre(
      {
        title: genre.title,
        createdAt: genre.createdAt,
        updatedAt: genre.updatedAt,
      },
      genre.id,
    );
  }

  static toPrisma(genre: Genre) {
    return {
      id: genre.id,
      title: genre.title,
      createdAt: genre.createdAt,
      updatedAt: genre.updatedAt,
    };
  }
}
