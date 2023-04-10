import { Content } from '@application/entities/content';
import { FindManyTvShowRequest, TvShowRepository, TvShowResponse } from '@application/repositories/tvshow-repository';
import { Injectable } from '@nestjs/common';
import { PrismaContentMapper } from '../mappers/prisma-content-mapper';
import { PrismaTvShowMapper } from '../mappers/prisma-tvshow-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTvShowRepository implements TvShowRepository {
  constructor(private prisma: PrismaService) {}

  async findById(content: string): Promise<Content | null> {
    const tvShow = await this.prisma.tvShow.findUnique({
      where: { id: content },
      include: {
        genres: true,
      },
    });
    if (!tvShow) return null;

    return PrismaTvShowMapper.toDomain(tvShow);
  }

  async findMany({ skip, take, filters }: FindManyTvShowRequest): Promise<TvShowResponse> {
    const [items, count] = await this.prisma.$transaction([
      this.prisma.tvShow.findMany({
        skip,
        take,
        where: filters && { published: filters.published || undefined },
        orderBy: {
          updatedAt: 'desc',
        },
      }),

      this.prisma.tvShow.count({
        take: undefined,
        skip: undefined,
        where: filters && { published: filters.published || undefined },
      }),
    ]);

    return {
      total: count,
      content: items.map((item) => PrismaTvShowMapper.toDomain(item)),
    };
  }

  async create(content: Content): Promise<void> {
    const raw = PrismaContentMapper.toPrisma(content);
    await this.prisma.tvShow.create({
      data: raw,
    });
  }
  async save(tvShowId: string, content: Content): Promise<void> {
    const raw = PrismaContentMapper.toPrisma(content);
    const raw_genres = content.genres.map((genres) => {
      return {
        id: genres.id,
      };
    });

    await this.prisma.tvShow.update({ where: { id: tvShowId }, data: { ...raw, genres: { set: raw_genres } } });
  }
  async remove(tvShowId: string): Promise<void> {
    await this.prisma.tvShow.delete({ where: { id: tvShowId } });
  }
}
