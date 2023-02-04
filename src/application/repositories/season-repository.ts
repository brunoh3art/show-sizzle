import { Season } from '@application/entities/season';

export interface SeasonResponse {
  total: number;
  seasons: Season[];
}

export abstract class SeasonRepository {
  abstract findById(content: string): Promise<Season | null>;
  abstract findMany(skip: number, take: number): Promise<SeasonResponse>;
  abstract create(content: Season): Promise<void>;
  abstract save(seasonId: string, content: Season): Promise<void>;
  abstract remove(content: string): Promise<void>;
}
