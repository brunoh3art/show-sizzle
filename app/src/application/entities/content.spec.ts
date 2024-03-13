import { Content, Title } from './content';

describe('Content', () => {
  it('should be able to create a content', async () => {
    const content = new Content({
      title: new Title('string'),
      original_title: new Title('string'),
      overview: 'string',
      release_date: 'string',
      poster_image: 'string',
      background_image: 'string',
      published: true,
    });

    expect(content).toBeTruthy();
  });

  it('should not be able to create a content with less than 3 characters', () => {
    expect(
      () =>
        new Content({
          title: new Title('fo'),
          original_title: new Title('fo'),
          overview: 'string',
          release_date: 'string',
          poster_image: 'string',
          background_image: 'string',
          published: true,
        }),
    ).toThrow();
  });

  it('should not be able to create a content with more than 240 characters', () => {
    expect(
      () =>
        new Content({
          title: new Title('f'.repeat(241)),
          original_title: new Title('f'.repeat(241)),
          overview: 'string',
          release_date: 'string',
          poster_image: 'string',
          background_image: 'string',
          published: true,
        }),
    ).toThrow();
  });
});
