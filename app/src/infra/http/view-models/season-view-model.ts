import { Season } from '@application/entities/season';

export class SeasonViewModel {
  static toHTTP(season: Season) {
    return {
      id: season.id,
      title: season.title.value,
      season_number: season.season_number.value,
      season_overview: season.season_overview,
      poster_image: season.poster_image,
      release_date: season.release_date,
      isPublished: season.isPublished,
    };
  }
}
