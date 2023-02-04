import { Season } from '@application/entities/season';
import { SeasonRepository } from '@application/repositories/season-repository';
import { Injectable } from '@nestjs/common';

interface GetSeasonRequest {
  seasonId: string;
}

interface GetSeasonResponse {
  season: Season;
}
@Injectable()
export class GetSeason {
  constructor(private seasonRepository: SeasonRepository) {}

  async execute(request: GetSeasonRequest): Promise<GetSeasonResponse> {
    const { seasonId } = request;

    const season = await this.seasonRepository.findById(seasonId);

    return {
      season: season,
    };
  }
}
