import { Episode } from '@application/entities/episode';

export interface EpisodeResponse {
  total: number;
  episodes: Episode[];
}

export abstract class EpisodeRepository {
  abstract findById(content: string): Promise<Episode | null>;
  abstract findMany(skip: number, take: number): Promise<EpisodeResponse>;
  abstract create(content: Episode): Promise<void>;
  abstract save(episodeId: string, content: Episode): Promise<void>;
  abstract remove(content: string): Promise<void>;
}
