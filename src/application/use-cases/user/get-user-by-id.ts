import { User } from '@application/entities/user';
import { UserRepository } from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../errors/user-not-found';

interface GetUserByIdRequest {
  id: string;
}

interface GetUserByIdResponse {
  user: User;
}
@Injectable()
export class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(request: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    const { id } = request;

    const user = await this.userRepository.findById(id);

    if (!user) throw new UserNotFoundException();

    return { user };
  }
}
