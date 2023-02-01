import { MovieRepository } from '@application/repositories/movie-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaMovieRepository } from './prisma/repositories/prisma-movie-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: MovieRepository,
      useClass: PrismaMovieRepository,
    },
  ],
  exports: [MovieRepository],
})
export class DatabaseModule {}
