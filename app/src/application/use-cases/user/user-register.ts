import { Jwt } from '@application/configs/jwt';
import { Role } from '@application/entities/role';
import { User } from '@application/entities/user';
import { ControlAccessRepository } from '@application/repositories/control-access-repository';
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
  constructor(private userRepository: UserRepository, private role: ControlAccessRepository) {}

  async execute(request: UserRegisterRequest): Promise<UserRegisterResponse> {
    const { name, email, password } = request;

    const user = await this.userRepository.findByEmail(email);
    if (user) throw new Error('User exists');

    const hashPassword = await argon2.hash(password);
    const role = new Role({ name: 'USER' });

    const saveUser = new User({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });

    await this.userRepository.create(saveUser);

    const token = await Jwt.createAuthToken({ id: saveUser.id });

    return {
      user: saveUser,
      token: token,
    };
  }
}
