import { Season } from '@application/entities/season';
import { SeasonRepository } from '@application/repositories/season-repository';
import { Injectable } from '@nestjs/common';

interface FindManySeasonRequest {
  skip?: number;
  take: number;
  tvShowId: string;
}

type FindManySeasonResponse = {
  total: number;
  seasons: Season[];
};
@Injectable()
export class FindManySeason {
  constructor(private seasonRepository: SeasonRepository) {}

  async execute(request: FindManySeasonRequest): Promise<FindManySeasonResponse> {
    const { skip, take, tvShowId } = request;

    const { seasons, total } = await this.seasonRepository.findMany(skip, take, { tvShowId });

    return {
      seasons: seasons,
      total: total,
    };
  }
}
