import { AppRepository } from '@application/repositories/app-repository';
import { Injectable } from '@nestjs/common';
import { PrismaContentMapper } from '../mappers/prisma-content-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAppRepository implements AppRepository {
  constructor(private prisma: PrismaService) {}

  async browseByGenre(genre: string, skip: number, take: number) {
    // Get total count of movies and TV shows for the genre
    const [countMovie, countSerie] = await this.prisma.$transaction([
      this.prisma.movie.count({
        where: { genres: { some: { title: genre } } },
        skip: undefined,
        take: undefined,
      }),
      this.prisma.tvShow.count({
        where: { genres: { some: { title: genre } } },
        skip: undefined,
        take: undefined,
      }),
    ]);

    const [movies, series] = await this.prisma.$transaction([
      this.prisma.movie.findMany({
        where: { genres: { some: { title: genre } } },
        skip,
        take,
      }),
      this.prisma.tvShow.findMany({
        where: { genres: { some: { title: genre } } },
        skip,
        take,
      }),
    ]);

    return {
      count: countMovie + countSerie,
      results: [...movies.map(PrismaContentMapper.toDomain), ...series.map(PrismaContentMapper.toDomain)],
    };
  }

  async browse() {
    const genres = await this.prisma.genre.findMany({
      select: {
        title: true,
        movie: { select: { id: true, title: true, original_title: true, poster_image: true } },
        tvshow: { select: { id: true, title: true, original_title: true, poster_image: true } },
      },
    });

    const results = genres.map((g: any) => {
      const movie = g.movie.slice(0, 25).map(PrismaContentMapper.toDomain);
      const serie = g.tvshow.slice(0, 25).map(PrismaContentMapper.toDomain);

      return { title: g.title, items: [...movie, ...serie] };
    });
    console.log({ results });

    return results;
  }
}
