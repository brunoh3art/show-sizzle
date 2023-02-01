import { CreateMovie } from '@application/use-cases/movie/create-movie';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MoviesController } from './controllers/movies.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [MoviesController],
  providers: [CreateMovie],
})
export class HttpModule {}
