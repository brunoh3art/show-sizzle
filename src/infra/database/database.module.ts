import { MovieRepository } from '@application/repositories/movie-repository';
import { TvShowRepository } from '@application/repositories/tvshow-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaMovieRepository } from './prisma/repositories/prisma-movie-repository';
import { PrismaTvShowRepository } from './prisma/repositories/prisma-tvshow-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: MovieRepository,
      useClass: PrismaMovieRepository,
    },
    {
      provide: TvShowRepository,
      useClass: PrismaTvShowRepository,
    },
  ],
  exports: [MovieRepository, TvShowRepository],
})
export class DatabaseModule {}
