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
import { AppBrowse } from '@application/use-cases/app/app-browse';
import { AppBrowseByGenre } from '@application/use-cases/app/app-browse-by-genre';
import { AddPermissionRole, CreateRole } from '@application/use-cases/controlAccess/role';

import { CreatePermission } from '@application/use-cases/controlAccess/permission';
import { CreateEpisode } from '@application/use-cases/episode/create-episode';
import { DeleteEpisode } from '@application/use-cases/episode/delete-episode';
import { FindManyEpisode } from '@application/use-cases/episode/find-many-episode';
import { GetEpisode } from '@application/use-cases/episode/get-episode';
import { UpdateEpisode } from '@application/use-cases/episode/update-episode';
import { CreateGenre } from '@application/use-cases/genre/create-genre';
import { FindManyGenre } from '@application/use-cases/genre/find-many-genre';
import { UpdateMovie } from '@application/use-cases/movie/update-movie';
import { CreateSeason } from '@application/use-cases/season/create-season';
import { DeleteSeason } from '@application/use-cases/season/delete-season';
import { FindManySeason } from '@application/use-cases/season/find-many-season';
import { GetSeason } from '@application/use-cases/season/get-season';
import { UpdateSeason } from '@application/use-cases/season/update-season';
import { UpdateTvShow } from '@application/use-cases/tvshow/update-tvshow';
import { GetUserById } from '@application/use-cases/user/get-user-by-id';
import { UserLogin } from '@application/use-cases/user/user-login';
import { UserRegister } from '@application/use-cases/user/user-register';
import { CreateVideo } from '@application/use-cases/video/create-video';
import { GetVideo } from '@application/use-cases/video/get-video';
import { UpdateVideo } from '@application/use-cases/video/update-video';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { ControlAccessController } from './controllers/control.access.controller';
import { EpisodesController } from './controllers/episodes.controller';
import { GenresController } from './controllers/genres.controller';
import { MediaController } from './controllers/media-controller';
import { MoviesController } from './controllers/movies.controller';
import { SeasonsController } from './controllers/seasons.controller';
import { TvShowsController } from './controllers/tvshows-controller';
import { JwtStrategy } from './guards/jwt-strategy-guard';

@Module({
  imports: [DatabaseModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [
    AppController,
    MoviesController,
    TvShowsController,
    SeasonsController,
    EpisodesController,
    MediaController,
    AuthController,
    GenresController,
    ControlAccessController,
  ],
  providers: [
    // use case Controller & Movie
    CreateMovie,
    FindManyMovie,
    DeleteMovie,
    GetMovie,
    UpdateMovie,
    // use case Controller & TvShow
    CreateTvShow,
    FindManyTvShow,
    DeleteTvShow,
    GetTvShow,
    UpdateTvShow,
    // use case Season & Controller
    FindManySeason,
    GetSeason,
    CreateSeason,
    DeleteSeason,
    UpdateSeason,
    // use case Episode & Controller
    GetEpisode,
    FindManyEpisode,
    CreateEpisode,
    DeleteEpisode,
    UpdateEpisode,
    // use case video
    CreateVideo,
    GetVideo,
    UpdateVideo,
    // use case User
    UserLogin,
    UserRegister,
    GetUserById,
    //JWT token
    JwtStrategy,
    //APP
    AppBrowse,
    AppBrowseByGenre,
    //Genres
    FindManyGenre,
    CreateGenre,

    //control access role
    CreateRole,
    AddPermissionRole,
    //control access Permission
    CreatePermission,
  ],
})
export class HttpModule {}
