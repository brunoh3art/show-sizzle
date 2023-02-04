import { TvShowRepository } from '@application/repositories/tvshow-repository';
import { Injectable } from '@nestjs/common';
import { TvShowNotFoundException } from '../errors/tvshow-not-found';

interface DeleteSeasonRequest {
  seasonId: string;
}

type DeleteSeasonResponse = void;
@Injectable()
export class DeleteSeason {
  constructor(private seasonRepository: TvShowRepository) {}

  async execute(request: DeleteSeasonRequest): Promise<DeleteSeasonResponse> {
    const { seasonId } = request;

    const season = await this.seasonRepository.findById(seasonId);

    if (!season) throw new TvShowNotFoundException();

    await this.seasonRepository.remove(season.id);
  }
}
