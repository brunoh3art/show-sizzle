import { Permission } from '@application/entities/permission';
import { Role } from '@application/entities/role';
import { Replace } from '@helpers/replace';
import { Permission as PrismaPermission, UserRole } from '@prisma/client';

export class PrismaControlAccessMapper {
  static toPrismaRole(role: Role) {
    return {
      id: role.id,
      name: role.name,
    };
  }

  static toDomainRole(
    role: Replace<
      UserRole,
      {
        permissions: PrismaPermission[];
      }
    >,
  ) {
    return new Role({ name: role.name, permissions: role.permissions.map(this.toDamainPermission) }, role.id);
  }

  // permissions
  static toPrismaPermission(permission: Permission) {
    return {
      id: permission.id,
      name: permission.name,
    };
  }

  static toDamainPermission(permission: PrismaPermission) {
    return new Permission(
      {
        name: permission.name,
      },
      permission.id,
    );
  }
}
