import { CreateMovie } from '@application/use-cases/movie/create-movie';
import { DeleteMovie } from '@application/use-cases/movie/delete-movie';
import { FindManyMovie } from '@application/use-cases/movie/find-many-movie';
import { GetMovie } from '@application/use-cases/movie/get-movie';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MoviesController } from './controllers/movies.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MoviesController],
  providers: [CreateMovie, FindManyMovie, DeleteMovie, GetMovie],
})
export class HttpModule {}
