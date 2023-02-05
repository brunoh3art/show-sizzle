import { Episode } from '@application/entities/episode';

export interface EpisodeResponse {
  total: number;
  episodes: Episode[];
}

export abstract class EpisodeRepository {
  abstract findById(episodeId: string): Promise<Episode | null>;
  abstract findMany(skip: number, take: number): Promise<EpisodeResponse>;
  abstract create(episode: Episode): Promise<void>;
  abstract save(episodeId: string, episode: Episode): Promise<void>;
  abstract remove(episodeId: string): Promise<void>;
}
