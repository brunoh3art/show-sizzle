import { Video } from '@application/entities/video';
import { Content } from '../entities/content';

export interface MovieResponse {
  total: number;
  content: Content[];
}

export abstract class MovieRepository {
  abstract findById(content: string): Promise<Content | null>;
  abstract findMany(skip: number, take: number): Promise<MovieResponse>;
  abstract create(content: Content): Promise<void>;
  abstract save(movieId: string, content: Content, video?: Video): Promise<void>;
  abstract remove(content: string): Promise<void>;
}
