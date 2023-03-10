import { UserLogin } from '@application/use-cases/user/user-login';
import { UserRegister } from '@application/use-cases/user/user-register';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from '../dtos/user';

@Controller('auth')
export class AuthController {
  constructor(private userLogin: UserLogin, private userRegister: UserRegister) {}

  @Post('login')
  async login(@Body() data: LoginDTO) {
    const { email, password } = data;
    const { user, token } = await this.userLogin.execute({ email, password });
    return { user, token };
  }

  @Post('register')
  async register(@Body() data: RegisterDTO) {
    const { name, email, password } = data;

    const { user, token } = await this.userRegister.execute({ name, email, password });

    return {
      user,
      token,
    };
  }
}
