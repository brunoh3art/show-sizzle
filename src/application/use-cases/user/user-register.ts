import { User } from '@application/entities/user';
import { Jwt } from '@application/jwt';
import { UserRepository } from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface UserRegisterResponse {
  user: User;
  token: string;
}
@Injectable()
export class UserRegister {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UserRegisterRequest): Promise<UserRegisterResponse> {
    const { name, email, password } = request;

    const user = await this.userRepository.findByEmail(email);
    if (user) throw new Error('User exists');

    const hashPassword = await argon2.hash(password);

    const content = new User({
      name: name,
      email: email,
      password: hashPassword,
      role: 'USER',
    });

    await this.userRepository.create(content);

    const token = await Jwt.createAuthToken({ id: user.id });

    return {
      user: content,
      token: token,
    };
  }
}
