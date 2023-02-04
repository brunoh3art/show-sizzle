import { Season } from '@application/entities/season';
import { SeasonRepository } from '@application/repositories/season-repository';
import { Injectable } from '@nestjs/common';

interface FindManySeasonRequest {
  skip?: number;
  take: number;
}

type FindManySeasonResponse = {
  total: number;
  seasons: Season[];
};
@Injectable()
export class FindManySeason {
  constructor(private seasonRepository: SeasonRepository) {}

  async execute(request: FindManySeasonRequest): Promise<FindManySeasonResponse> {
    const { skip, take } = request;

    const { seasons, total } = await this.seasonRepository.findMany(skip, take);

    return {
      seasons: seasons,
      total: total,
    };
  }
}
