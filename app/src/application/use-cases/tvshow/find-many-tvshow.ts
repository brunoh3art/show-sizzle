import { FindManyTvShowRequest, TvShowRepository } from '@application/repositories/tvshow-repository';
import { Injectable } from '@nestjs/common';
import { Content } from '../../entities/content';

interface FindManyTvShowResponse {
  page: number;
  total: number;
  content: Content[];
}
@Injectable()
export class FindManyTvShow {
  constructor(private contentRepository: TvShowRepository) {}

  async execute(request: FindManyTvShowRequest): Promise<FindManyTvShowResponse> {
    const { skip, take, filters } = request;

    const { content, total } = await this.contentRepository.findMany({ skip, take, filters });

    return {
      content: content,
      total: total,
      page: skip,
    };
  }
}
