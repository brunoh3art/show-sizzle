import { Content } from '../entities/content';

export type ContentFilter = {
  published?: boolean;
};
export interface FindManyTvShowRequest {
  skip?: number;
  take: number;
  filters?: ContentFilter;
}

export interface TvShowResponse {
  total: number;
  content: Content[];
}

export abstract class TvShowRepository {
  abstract findById(content: string): Promise<Content | null>;
  abstract findMany(props: FindManyTvShowRequest): Promise<TvShowResponse>;
  abstract create(content: Content): Promise<void>;
  abstract save(tvshowId: string, content: Content): Promise<void>;
  abstract remove(content: string): Promise<void>;
}
