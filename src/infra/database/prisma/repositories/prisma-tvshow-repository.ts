import { Content } from '@application/entities/content';
import { TvShowRepository, TvShowResponse } from '@application/repositories/tvshow-repository';
import { Injectable } from '@nestjs/common';
import { PrismaContentMapper } from '../mappers/prisma-content-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTvShowRepository implements TvShowRepository {
  constructor(private prisma: PrismaService) {}

  async findById(content: string): Promise<Content | null> {
    const tvShow = await this.prisma.tvShow.findUnique({ where: { id: content } });
    if (!tvShow) return null;

    return PrismaContentMapper.toDomain(tvShow);
  }

  async findMany(skip: number, take: number): Promise<TvShowResponse> {
    const [items, count] = await this.prisma.$transaction([
      this.prisma.tvShow.findMany({
        skip,
        take,
      }),

      this.prisma.tvShow.count({
        take: undefined,
        skip: undefined,
      }),
    ]);

    return {
      total: count,
      content: items.map((item) => PrismaContentMapper.toDomain(item)),
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
    await this.prisma.tvShow.update({ where: { id: tvShowId }, data: raw });
  }
  async remove(tvShowId: string): Promise<void> {
    await this.prisma.tvShow.delete({ where: { id: tvShowId } });
  }
}
