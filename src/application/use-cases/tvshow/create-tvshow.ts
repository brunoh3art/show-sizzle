import { TvShowRepository } from '@application/repositories/tvshow-repository';
import { Injectable } from '@nestjs/common';
import { Content, Title } from '../../entities/content';

interface CreateTvShowRequest {
  id?: string;
  title: string;
  original_title: string;
  overview?: string;
  release_date: string;
  poster_image?: string;
  background_image?: string;
  published: boolean;
}

interface CreateTvShowResponse {
  content: Content;
}
@Injectable()
export class CreateTvShow {
  constructor(private contentRepository: TvShowRepository) {}

  async execute(request: CreateTvShowRequest): Promise<CreateTvShowResponse> {
    const { id, title, original_title, overview, release_date, poster_image, background_image, published } = request;

    const content = new Content(
      {
        title: new Title(title),
        original_title: new Title(original_title),
        overview,
        release_date,
        poster_image,
        background_image,
        published,
      },
      id,
    );

    await this.contentRepository.create(content);

    return { content };
  }
}
