import { User } from '@application/entities/user';
import { Replace } from '@helpers/replace';
import { User as UserPrisma } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  static toDomain(user: Replace<UserPrisma, { userRoleId?: string }>) {
    return new User(
      {
        email: user.email,
        password: user.password,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      user.id,
    );
  }
}
