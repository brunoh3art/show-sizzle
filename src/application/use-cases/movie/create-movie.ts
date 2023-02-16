import { MovieRepository } from '@application/repositories/movie-repository';
import { Injectable } from '@nestjs/common';
import { Content, Title } from '../../entities/content';
import { CreateVideo } from '../video/create-video';

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
  video: CreateVideoRequest;
}

interface CreateMovieResponse {
  content: Content;
}
@Injectable()
export class CreateMovie {
  constructor(private contentRepository: MovieRepository, private createVideo: CreateVideo) {}

  async execute(request: CreateMovieRequest): Promise<CreateMovieResponse> {
    const { title, original_title, overview, release_date, poster_image, background_image, published, video } = request;

    const content = new Content({
      title: new Title(title),
      original_title: new Title(original_title),
      overview,
      release_date,
      poster_image,
      background_image,
      published,
    });

    await this.contentRepository.create(content);

    await this.createVideo.execute({
      id: content.id,
      ...video,
    });

    return { content };
  }
}
