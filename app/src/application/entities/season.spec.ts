import { Season, SeasonNumber, SeasonTitle } from './season';

describe('Season', () => {
  it('should be able to create a content', async () => {
    const season = new Season({
      title: new SeasonTitle('Season 1'),
      season_number: new SeasonNumber(1),
      season_overview: 'string',
      release_date: 'string',
      poster_image: 'string',
    });

    expect(season).toBeTruthy();
  });

  it('should not be able to be able to create a season with number less than 1', () => {
    expect(
      () =>
        new Season({
          title: new SeasonTitle('Season 0'),
          season_number: new SeasonNumber(0),
          season_overview: 'string',
          release_date: 'string',
          poster_image: 'string',
        }),
    ).toThrow();
  });

  it('should not be able to create a season with less than 3 characters', () => {
    expect(
      () =>
        new Season({
          title: new SeasonTitle('Se'),
          season_number: new SeasonNumber(1),
          season_overview: 'string',
          release_date: 'string',
          poster_image: 'string',
        }),
    ).toThrow();
  });
});
