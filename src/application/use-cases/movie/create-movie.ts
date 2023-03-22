import { Genre } from '@application/entities/genre';
import { MovieRepository } from '@application/repositories/movie-repository';
import { Injectable } from '@nestjs/common';
import { Content, Title } from '../../entities/content';

interface CreateVideoRequest {
  title: string;
  type: string;
  link: string;
  format: string;
}

interface CreateMovieRequest {
  title: string;
  original_title: string;
  overview?: string;
  release_date: string;
  poster_image?: string;
  background_image?: string;
  published: boolean;
  genres?: string[];
}

interface CreateMovieResponse {
  content: Content;
}
@Injectable()
export class CreateMovie {
  constructor(private contentRepository: MovieRepository) {}

  async execute(request: CreateMovieRequest): Promise<CreateMovieResponse> {
    const { title, original_title, overview, release_date, poster_image, background_image, published, genres } =
      request;

    const content = new Content({
      title: new Title(title),
      original_title: new Title(original_title),
      overview,
      release_date,
      poster_image,
      background_image,
      published,
      genres: genres.map((genre) => new Genre({ title: 'genre' }, genre)),
    });

    await this.contentRepository.create(content);

    return { content };
  }
}
