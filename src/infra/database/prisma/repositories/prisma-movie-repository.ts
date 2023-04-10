import { Content } from '@application/entities/content';
import { Video } from '@application/entities/video';
import { FindManyMovieRequest, MovieRepository, MovieResponse } from '@application/repositories/movie-repository';
import { Injectable } from '@nestjs/common';
import { PrismaContentMapper } from '../mappers/prisma-content-mapper';
import { PrismaVideoMapper } from '../mappers/prisma-video-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaMovieRepository implements MovieRepository {
  constructor(private prisma: PrismaService) {}

  async findById(content: string): Promise<Content | null> {
    const movie = await this.prisma.movie.findUnique({
      where: { id: content },
      include: {
        genres: true,
      },
    });
    if (!movie) return null;

    return PrismaContentMapper.toDomain(movie);
  }

  async findMany({ skip, take, filters }: FindManyMovieRequest): Promise<MovieResponse> {
    const [items, count] = await this.prisma.$transaction([
      this.prisma.movie.findMany({
        skip,
        take,
        include: {
          genres: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        where: filters && { published: filters.published || undefined },
      }),

      this.prisma.movie.count({
        take: undefined,
        skip: undefined,
        where: filters && { published: filters.published || undefined },
      }),
    ]);

    return {
      total: count,
      content: items.map(PrismaContentMapper.toDomain),
    };
  }

  async create(content: Content): Promise<void> {
    const raw = PrismaContentMapper.toPrisma(content);
    await this.prisma.movie.create({
      data: {
        ...raw,
        genres: {
          connect: content.genres.map((genres) => {
            return {
              id: genres.id,
            };
          }),
        },
      },
    });
  }
  async save(movieId: string, content: Content, media: Video): Promise<void> {
    const raw = PrismaContentMapper.toPrisma(content);
    const { createdAt, ...raw_video } = PrismaVideoMapper.toPrisma(media);

    const raw_genres = content.genres.map((genres) => {
      return {
        id: genres.id,
      };
    });

    await this.prisma.movie.update({
      where: { id: movieId },
      data: {
        ...raw,
        genres: { set: raw_genres },
        video: {
          upsert: {
            update: raw_video,
            create: { createdAt, ...raw_video },
          },
        },
      },
    });
  }
  async remove(movieId: string): Promise<void> {
    await this.prisma.movie.delete({ where: { id: movieId } });
  }
}
