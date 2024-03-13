import { Episode } from '@application/entities/episode';
import { EpisodeRepository, EpisodeResponse } from '@application/repositories/episode-repository';
import { Injectable } from '@nestjs/common';
import { PrismaEpisodeMapper } from '../mappers/prisma-episode-mapper';
import { PrismaService } from '../prisma.service';
@Injectable()
export class PrismaEpisodeRepository implements EpisodeRepository {
  constructor(private prisma: PrismaService) {}
  async findById(episodeId: string): Promise<Episode | null> {
    const episode = await this.prisma.episode.findUnique({ where: { id: episodeId }, include: { season: true } });
    if (!episode) return null;

    return PrismaEpisodeMapper.toDomain(episode);
  }
  async findMany({ skip, take, seasonId }): Promise<EpisodeResponse> {
    const [episodes, count] = await this.prisma.$transaction([
      this.prisma.episode.findMany({
        skip: skip,
        take: take,
        include: { season: true },
        where: { seasonId: seasonId },
        orderBy: {
          episode_number: 'desc',
        },
      }),
      this.prisma.episode.count({ where: { seasonId: seasonId }, skip: undefined, take: undefined }),
    ]);

    return {
      total: count,
      episodes: episodes.map(PrismaEpisodeMapper.toDomain),
    };
  }
  async create({ episode, seasonId }): Promise<void> {
    const raw = PrismaEpisodeMapper.toPrisma(episode);
    await this.prisma.episode.create({
      data: {
        ...raw,
        season: { connect: { id: seasonId } },
      },
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
