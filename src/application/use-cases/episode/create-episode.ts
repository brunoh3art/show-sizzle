import { Season, SeasonNumber, SeasonTitle } from '@application/entities/season';
import { SeasonRepository } from '@application/repositories/season-repository';
import { Injectable } from '@nestjs/common';

interface CreateSeasonRequest {
  title: string;
  season_number: number;
  season_overview?: string;
  poster_image?: string;
  release_date?: string;
  isPublished?: boolean;
}

interface CreateSeasonResponse {
  season: Season;
}
@Injectable()
export class CreateSeason {
  constructor(private seasonRepository: SeasonRepository) {}

  async execute(request: CreateSeasonRequest): Promise<CreateSeasonResponse> {
    const { title, release_date, poster_image, season_number, isPublished, season_overview } = request;

    const season = new Season({
      title: new SeasonTitle(title),
      season_number: new SeasonNumber(season_number),
      season_overview,
      release_date,
      poster_image,
      isPublished,
    });

    await this.seasonRepository.create(season);

    return { season };
  }
}
