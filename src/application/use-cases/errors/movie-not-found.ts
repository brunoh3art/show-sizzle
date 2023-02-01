export class MovieNotFoundException extends Error {
  constructor() {
    super('Movie not found');
  }
}
