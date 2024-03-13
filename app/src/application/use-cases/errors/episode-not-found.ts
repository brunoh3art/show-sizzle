export class EpisodeFoundException extends Error {
  constructor() {
    super('Episode not found');
  }
}
