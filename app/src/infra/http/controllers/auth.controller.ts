import { UserLogin } from '@application/use-cases/user/user-login';
import { UserRegister } from '@application/use-cases/user/user-register';

import { User } from '@application/entities/user';
import { GetUserById } from '@application/use-cases/user/get-user-by-id';
import { UserDecorators } from '@infra/decorators/user-decorators';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from '../dtos/user';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { RoleGuard } from '../guards/role-guard';
import { UserViewModel } from '../view-models/user-view-model';

@Controller()
export class AuthController {
  constructor(private userLogin: UserLogin, private userRegister: UserRegister, private getUserById: GetUserById) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('me')
  async me(@UserDecorators() user: User) {
    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Post('auth/login')
  async login(@Body() data: LoginDTO) {
    const { email, password } = data;
    const { user, token } = await this.userLogin.execute({ email, password });

    return { user: UserViewModel.toHTTP(user), token };
  }

  @Post('auth/register')
  async register(@Body() data: RegisterDTO) {
    const { name, email, password } = data;

    console.log(`register: `, { name, email, password });

    const { user, token } = await this.userRegister.execute({ name, email, password });

    return { user: UserViewModel.toHTTP(user), token };
  }
}
