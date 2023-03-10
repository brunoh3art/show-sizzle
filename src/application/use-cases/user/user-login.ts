import { User } from '@application/entities/user';
import { Jwt } from '@application/jwt';
import { UserRepository } from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserNotFoundException } from '../errors/user-not-found';
import { UserPasswordIncorrectException } from '../errors/user-password-incorrect';

interface UserLoginRequest {
  email: string;
  password: string;
}

interface UserRegisterResponse {
  user: User;
  token: string;
}
@Injectable()
export class UserLogin {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UserLoginRequest): Promise<UserRegisterResponse> {
    const { email, password } = request;

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new UserNotFoundException();

    const passwordIsValid = await argon2.verify(user.password, password);

    if (!passwordIsValid) throw new UserPasswordIncorrectException();

    const token = await Jwt.createAuthToken({ id: user.id });

    return { user, token };
  }
}
