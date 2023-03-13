import { EpisodeRepository } from '@application/repositories/episode-repository';
import { MovieRepository } from '@application/repositories/movie-repository';
import { SeasonRepository } from '@application/repositories/season-repository';
import { TvShowRepository } from '@application/repositories/tvshow-repository';
import { VideoRepository } from '@application/repositories/video-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { AppRepository } from '@application/repositories/app-repository';
import { UserRepository } from '@application/repositories/user-repository';
import { PrismaAppRepository } from './prisma/repositories/prisma-app-repository';
import { PrismaEpisodeRepository } from './prisma/repositories/prisma-episode-repository';
import { PrismaMovieRepository } from './prisma/repositories/prisma-movie-repository';
import { PrismaSeasonRepository } from './prisma/repositories/prisma-season-repository';
import { PrismaTvShowRepository } from './prisma/repositories/prisma-tvshow-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PrismaVideoRepository } from './prisma/repositories/prisma-video-repository';

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
    {
      provide: SeasonRepository,
      useClass: PrismaSeasonRepository,
    },
    {
      provide: EpisodeRepository,
      useClass: PrismaEpisodeRepository,
    },
    {
      provide: VideoRepository,
      useClass: PrismaVideoRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: AppRepository,
      useClass: PrismaAppRepository,
    },
  ],
  exports: [
    MovieRepository,
    TvShowRepository,
    SeasonRepository,
    EpisodeRepository,
    VideoRepository,
    UserRepository,
    AppRepository,
  ],
})
export class DatabaseModule {}
