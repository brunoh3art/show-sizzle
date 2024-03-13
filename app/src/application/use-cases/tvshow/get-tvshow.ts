import { TvShowRepository } from '@application/repositories/tvshow-repository';
import { Injectable } from '@nestjs/common';
import { Content } from '../../entities/content';

interface GetTvShowRequest {
  tvshowId: string;
}

interface GetTvShowResponse {
  content: Content;
}
@Injectable()
export class GetTvShow {
  constructor(private contentRepository: TvShowRepository) {}

  async execute(request: GetTvShowRequest): Promise<GetTvShowResponse> {
    const { tvshowId } = request;

    const content = await this.contentRepository.findById(tvshowId);

    console.log({ content });

    return {
      content: content,
    };
  }
}
