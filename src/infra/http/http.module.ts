//use cases movies
import { CreateMovie } from '@application/use-cases/movie/create-movie';
import { DeleteMovie } from '@application/use-cases/movie/delete-movie';
import { FindManyMovie } from '@application/use-cases/movie/find-many-movie';
import { GetMovie } from '@application/use-cases/movie/get-movie';
//use cases tvshows
import { CreateTvShow } from '@application/use-cases/tvshow/create-tvshow';
import { DeleteTvShow } from '@application/use-cases/tvshow/delete-tvshow';
import { FindManyTvShow } from '@application/use-cases/tvshow/find-many-tvshow';
import { GetTvShow } from '@application/use-cases/tvshow/get-tvshow';

import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
//controllers
import { CreateEpisode } from '@application/use-cases/episode/create-episode';
import { DeleteEpisode } from '@application/use-cases/episode/delete-episode';
import { FindManyEpisode } from '@application/use-cases/episode/find-many-episode';
import { GetEpisode } from '@application/use-cases/episode/get-episode';
import { CreateSeason } from '@application/use-cases/season/create-season';
import { DeleteSeason } from '@application/use-cases/season/delete-season';
import { FindManySeason } from '@application/use-cases/season/find-many-season';
import { GetSeason } from '@application/use-cases/season/get-season';
import { CreateVideo } from '@application/use-cases/video/create-video';
import { EpisodesController } from './controllers/episodes.controller';
import { MediaController } from './controllers/media-controller';
import { MoviesController } from './controllers/movies.controller';
import { SeasonsController } from './controllers/seasons.controller';
import { TvShowsController } from './controllers/tvshows-controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MoviesController, TvShowsController, SeasonsController, EpisodesController, MediaController],
  providers: [
    // use case Controller & Movie
    CreateMovie,
    FindManyMovie,
    DeleteMovie,
    GetMovie,
    // use case Controller & TvShow
    CreateTvShow,
    FindManyTvShow,
    DeleteTvShow,
    GetTvShow,
    // use case Season & Controller
    FindManySeason,
    GetSeason,
    CreateSeason,
    DeleteSeason,
    // use case Episode & Controller
    GetEpisode,
    FindManyEpisode,
    CreateEpisode,
    DeleteEpisode,
    // use case video
    CreateVideo,
  ],
})
export class HttpModule {}
