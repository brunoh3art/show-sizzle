import { StatusCodes } from 'http-status-codes';

export class UserPasswordIncorrectException extends Error {
  private status: number;
  constructor() {
    super('Password incorrect');
    this.status = StatusCodes.UNAUTHORIZED;
  }
}
