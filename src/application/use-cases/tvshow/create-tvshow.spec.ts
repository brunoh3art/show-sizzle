import { InMemoryMovieRepository } from '@test/repositories/in-memory-movie-repository';
import { CreateTvShow } from './create-tvshow';

describe('Create movie', () => {
  it('should be able to create a movie', async () => {
    const createMovieRepository = new InMemoryMovieRepository();
    const createMovie = new CreateTvShow(createMovieRepository);

    const { content } = await createMovie.execute({
      title: 'string',
      original_title: 'string',
      overview: 'string',
      release_date: 'string',
      poster_image: 'string',
      background_image: 'string',
      published: true,
    });

    expect(createMovieRepository.movies).toHaveLength(1);
    expect(createMovieRepository.movies[0]).toEqual(content);
  });
});
