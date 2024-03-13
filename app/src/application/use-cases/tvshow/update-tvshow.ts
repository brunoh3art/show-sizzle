import { Genre } from '@application/entities/genre';
import { TvShowRepository } from '@application/repositories/tvshow-repository';
import { Injectable } from '@nestjs/common';
import { Content, Title } from '../../entities/content';

interface UpdateTvShowRequest {
  id: string;
  title: string;
  original_title: string;
  overview?: string;
  release_date: string;
  poster_image?: string;
  background_image?: string;
  published: boolean;
  genres: string[];
}

interface UpdateTvShowResponse {
  content: Content;
}
@Injectable()
export class UpdateTvShow {
  constructor(private contentRepository: TvShowRepository) {}

  async execute(request: UpdateTvShowRequest): Promise<UpdateTvShowResponse> {
    const { id, title, original_title, overview, release_date, poster_image, background_image, published, genres } =
      request;

    const { createdAt } = await this.contentRepository.findById(id);

    const content = new Content(
      {
        title: new Title(title),
        original_title: new Title(original_title),
        overview,
        release_date,
        poster_image,
        background_image,
        published,
        createdAt,
        genres: genres.map((genre) => new Genre({ title: 'genre' }, genre)),
      },
      id,
    );

    await this.contentRepository.save(id, content);

    return { content };
  }
}
