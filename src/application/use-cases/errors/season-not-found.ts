export class SeasonFoundException extends Error {
  constructor() {
    super('Season not found');
  }
}
