import { Season, SeasonNumber, SeasonTitle } from '@application/entities/season';
import { Season as PrismaSeason } from '@prisma/client';

export class PrismaSeasonMapper {
  static toPrisma(season: Season) {
    return {
      title: season.title.value,
      season_number: season.season_number.value,
      season_overview: season.season_overview,
      poster_image: season.poster_image,
      release_date: season.release_date,
      isPublished: season.isPublished,
      createdAt: season.createdAt,
      updatedAt: season.updatedAt,
      id: season.id,
    };
  }

  static toDomain(season: PrismaSeason): Season {
    return new Season(
      {
        title: new SeasonTitle(season.title),
        season_number: new SeasonNumber(season.season_number),
        season_overview: season.season_overview,
        poster_image: season.poster_image,
        release_date: season.release_date,

        isPublished: season.isPublished,
        createdAt: season.createdAt,
        updatedAt: season.updatedAt,
      },
      season.id,
    );
  }
}
