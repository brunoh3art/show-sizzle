import { Season, SeasonNumber, SeasonTitle } from '@application/entities/season';
import { SeasonRepository } from '@application/repositories/season-repository';
import { Injectable } from '@nestjs/common';

interface UpdateSeasonRequest {
  title: string;
  season_number: number;
  season_overview?: string;
  poster_image?: string;
  release_date?: string;
  isPublished?: boolean;
}

interface UpdateSeasonResponse {
  season: Season;
}

interface UpdateSeasonRquestProps {
  season: UpdateSeasonRequest;
  seasonId: string;
}

@Injectable()
export class UpdateSeason {
  constructor(private seasonRepository: SeasonRepository) {}

  async execute(request: UpdateSeasonRquestProps): Promise<UpdateSeasonResponse> {
    const {
      season: { title, release_date, poster_image, season_number, isPublished, season_overview },
      seasonId,
    } = request;

    const { createdAt } = await this.seasonRepository.findById(seasonId);

    const season = new Season(
      {
        title: new SeasonTitle(title),
        season_number: new SeasonNumber(season_number),
        season_overview,
        release_date,
        poster_image,
        isPublished,
        createdAt: createdAt,
      },
      seasonId,
    );

    await this.seasonRepository.save(seasonId, season);

    return { season };
  }
}
