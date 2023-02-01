import { Content } from '../entities/content';

export abstract class MovieRepository {
  abstract create(content: Content): Promise<void>;
  abstract findById(content: string): Promise<Content | null>;
}
