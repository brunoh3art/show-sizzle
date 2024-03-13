import { Genre } from '@application/entities/genre';
import { Video } from '@application/entities/video';
import { MovieRepository } from '@application/repositories/movie-repository';
import { Injectable } from '@nestjs/common';
import { Content, Title } from '../../entities/content';

interface UpdateVideoRequest {
  title: string;
  type: string;
  link: string;
  format: string;
}

interface UpdateMovieRequest {
  id: string;
  title: string;
  original_title: string;
  overview?: string;
  release_date: string;
  poster_image?: string;
  background_image?: string;
  published: boolean;
  video: UpdateVideoRequest;
  genres: string[];
}

interface UpdateMovieResponse {
  content: Content;
}
@Injectable()
export class UpdateMovie {
  constructor(private contentRepository: MovieRepository) {}

  async execute(request: UpdateMovieRequest): Promise<UpdateMovieResponse> {
    const {
      id,
      title,
      original_title,
      overview,
      release_date,
      poster_image,
      background_image,
      published,
      genres,
      video,
    } = request;

    const findContent = await this.contentRepository.findById(id);

    const content = new Content(
      {
        title: new Title(title),
        original_title: new Title(original_title),
        overview,
        release_date,
        poster_image,
        background_image,
        published,
        createdAt: findContent.createdAt,
        genres: genres.map((genre) => new Genre({ title: 'genre' }, genre)),
      },
      id,
    );

    const media = new Video(
      {
        title: video.title,
        type: 'movie',
        link: video.link,
        format: video.format,
      },
      id,
    );

    await this.contentRepository.save(id, content, media);

    return { content };
  }
}
