import { Episode } from '@application/entities/episode';

export interface EpisodeResponse {
  total: number;
  episodes: Episode[];
}
interface EpisodeResponseProps {
  skip: number;
  take: number;
  seasonId: string;
}
interface EpisodeCreateResponseProps {
  episode: Episode;
  seasonId: string;
}

export abstract class EpisodeRepository {
  abstract findById(episodeId: string): Promise<Episode | null>;
  abstract findMany({ skip, take, seasonId }: EpisodeResponseProps): Promise<EpisodeResponse>;
  abstract create({ episode, seasonId }: EpisodeCreateResponseProps): Promise<void>;
  abstract save(episodeId: string, episode: Episode): Promise<void>;
  abstract remove(episodeId: string): Promise<void>;
}
