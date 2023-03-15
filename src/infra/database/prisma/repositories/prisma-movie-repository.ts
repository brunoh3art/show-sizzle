import { Content } from '@application/entities/content';
import { MovieRepository, MovieResponse } from '@application/repositories/movie-repository';
import { Injectable } from '@nestjs/common';
import { PrismaContentMapper } from '../mappers/prisma-content-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaMovieRepository implements MovieRepository {
  constructor(private prisma: PrismaService) {}

  async findById(content: string): Promise<Content | null> {
    const movie = await this.prisma.movie.findUnique({ where: { id: content } });
    if (!movie) return null;

    return PrismaContentMapper.toDomain(movie);
  }

  async findMany(skip: number, take: number): Promise<MovieResponse> {
    const [items, count] = await this.prisma.$transaction([
      this.prisma.movie.findMany({
        skip,
        take,
      }),

      this.prisma.movie.count({
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
    await this.prisma.movie.create({
      data: {
        ...raw,
      },
    });
  }
  async save(movieId: string, content: Content): Promise<void> {
    const raw = PrismaContentMapper.toPrisma(content);
    await this.prisma.movie.update({ where: { id: movieId }, data: raw });
  }
  async remove(movieId: string): Promise<void> {
    await this.prisma.movie.delete({ where: { id: movieId } });
  }
}
