export class MovieNotFoundException extends Error {
  constructor() {
    super('Content not found');
  }
}
