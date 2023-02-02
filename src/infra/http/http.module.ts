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
import { MoviesController } from './controllers/movies.controller';
import { TvShowsController } from './controllers/tvshows-controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MoviesController, TvShowsController],
  providers: [CreateMovie, FindManyMovie, DeleteMovie, GetMovie, CreateTvShow, FindManyTvShow, DeleteTvShow, GetTvShow],
})
export class HttpModule {}
