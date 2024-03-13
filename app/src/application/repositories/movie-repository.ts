import { Video } from '@application/entities/video';
import { Content } from '../entities/content';

export type ContentFilter = {
  published?: boolean;
};
export interface FindManyMovieRequest {
  skip?: number;
  take: number;
  filters?: ContentFilter;
}
export interface MovieResponse {
  total: number;
  content: Content[];
}

export abstract class MovieRepository {
  abstract findById(content: string): Promise<Content | null>;
  abstract findMany({ skip, take }: FindManyMovieRequest): Promise<MovieResponse>;
  abstract create(content: Content): Promise<void>;
  abstract save(movieId: string, content: Content, video?: Video): Promise<void>;
  abstract remove(content: string): Promise<void>;
}
