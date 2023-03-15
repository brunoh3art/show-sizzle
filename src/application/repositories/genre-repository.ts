import { Genre } from '@application/entities/genre';

export interface GenreResponse {
  total: number;
  content: Genre[];
}
export abstract class GenreRepository {
  abstract findById(content: string): Promise<Genre | null>;
  abstract findMany(skip: number, take: number): Promise<GenreResponse>;
  abstract create(content: Genre): Promise<void>;
  abstract save(genreId: string, content: Genre): Promise<void>;
  abstract remove(content: string): Promise<void>;
}
