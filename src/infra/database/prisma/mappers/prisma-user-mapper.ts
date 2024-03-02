import { Role } from '@application/entities/role';
import { User } from '@application/entities/user';
import { Replace } from '@helpers/replace';
import { Role as PrismaRole, User as UserPrisma } from '@prisma/client';
import { PrismaControlAccessMapper } from './prisma-control-access.mapper';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      avatar: user.avatar,
      role: PrismaControlAccessMapper.toPrismaRole(user.role),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  static toDomain(user: Replace<UserPrisma, { roleId?: string; role?: PrismaRole | Role }>) {
    return new User(
      {
        email: user.email,
        password: user.password,
        name: user.name,
        avatar: user.avatar,
        role: new Role({ name: user.role.name }, user.role.id),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      user.id,
    );
  }
}
