import { Episode } from '@application/entities/episode';
import { EpisodeRepository, EpisodeResponse } from '@application/repositories/episode-repository';
import { PrismaEpisodeMapper } from '../mappers/prisma-episode-mapper';
import { PrismaService } from '../prisma.service';

export class PrismaEpisodeRepository implements EpisodeRepository {
  constructor(private prisma: PrismaService) {}
  async findById(episodeId: string): Promise<Episode | null> {
    const episode = await this.prisma.episode.findUnique({ where: { id: episodeId } });
    if (!episode) return null;

    return PrismaEpisodeMapper.toDomain(episode);
  }
  async findMany(skip: number, take: number): Promise<EpisodeResponse> {
    const [episodes, count] = await this.prisma.$transaction([
      this.prisma.episode.findMany({ skip: skip, take: take }),
      this.prisma.episode.count({ skip: undefined, take: undefined }),
    ]);

    return {
      total: count,
      episodes: episodes.map(PrismaEpisodeMapper.toDomain),
    };
  }
  async create(episode: Episode): Promise<void> {
    const raw = PrismaEpisodeMapper.toPrisma(episode);
    await this.prisma.episode.create({
      data: raw,
    });
  }

  async save(episodeId: string, episode: Episode): Promise<void> {
    const raw = PrismaEpisodeMapper.toPrisma(episode);
    await this.prisma.episode.update({ where: { id: episodeId }, data: raw });
  }
  async remove(episodeId: string): Promise<void> {
    await this.prisma.episode.delete({ where: { id: episodeId } });
  }
}
