export class TvShowNotFoundException extends Error {
  constructor() {
    super('Content not found');
  }
}
