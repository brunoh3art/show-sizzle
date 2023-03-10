import { ExtractJwt, Strategy } from 'passport-jwt';

import { APP_AUTH_SECRET } from '@application/config';
import { User } from '@application/entities/user';
import { GetUserById } from '@application/use-cases/user/get-user-by-id';
import { PrismaUserMapper } from '@infra/database/prisma/mappers/prisma-user-mapper';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

export interface JwtDto {
  id: string;
  /**
   * Issued at
   */
  iat: number;
  /**
   * Expiration time
   */
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly getUserById: GetUserById) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: APP_AUTH_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtDto): Promise<Omit<User, 'password'>> {
    const { user } = await this.getUserById.execute({ id: payload.id });
    return PrismaUserMapper.toDomain(user);
  }
}
