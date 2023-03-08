import { Jwt } from '@application/jwt';
import { UserRepository } from '@application/repositories/user-repository';
import argon2 from 'argon2';

interface UserLoginRequest {
  email: string;
  password: string;
}

export class UserLogin {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UserLoginRequest) {
    const { email, password } = request;

    const user = await this.userRepository.findByEmail(email);
    const passwordIsValid = await argon2.verify(user.password, password);

    if (!user) throw new Error('User not found');
    if (!passwordIsValid) throw new Error('Password incorrect');

    const token = Jwt.createToken({ id: user.id });

    return { user, token };
  }
}
