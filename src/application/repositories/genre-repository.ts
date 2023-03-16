import { Genre } from '@application/entities/genre';

export interface GenreRequest {
  skip: number;
  take: number;
  genre?: string;
}
export interface GenreResponse {
  total: number;
  content: Genre[];
}
export abstract class GenreRepository {
  abstract findByName(content: string): Promise<Genre | null>;
  abstract findMany(raw: GenreRequest): Promise<GenreResponse>;
  abstract create(content: Genre): Promise<void>;
  abstract save(genreId: string, content: Genre): Promise<void>;
  abstract remove(content: string): Promise<void>;
}
