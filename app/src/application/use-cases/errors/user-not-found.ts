import { StatusCodes } from 'http-status-codes';

export class UserNotFoundException extends Error {
  private status: number;
  constructor() {
    super('User not found');
    this.status = StatusCodes.NOT_FOUND;
  }
}
