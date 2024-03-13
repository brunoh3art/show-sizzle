import { TvShowRepository } from '@application/repositories/tvshow-repository';
import { Injectable } from '@nestjs/common';
import { TvShowNotFoundException } from '../errors/tvshow-not-found';

interface DeleteTvShowRequest {
  tvShowId: string;
}

type DeleteTvShowResponse = void;
@Injectable()
export class DeleteTvShow {
  constructor(private contentRepository: TvShowRepository) {}

  async execute(request: DeleteTvShowRequest): Promise<DeleteTvShowResponse> {
    const { tvShowId } = request;

    const TvShow = await this.contentRepository.findById(tvShowId);

    if (!TvShow) throw new TvShowNotFoundException();

    await this.contentRepository.remove(TvShow.id);
  }
}
