import { Permission } from '@application/entities/permission';
import { Role } from '@application/entities/role';

export abstract class ControlAccessRepository {
  abstract createRole(role: Role): Promise<void>;
  abstract deleteRole(roleId: string): Promise<void>;
  abstract getAllRoles(): Promise<Role[]>;

  abstract createPermission(permission: Permission): Promise<void>;
  abstract addPermissionRole(roleId: string, permission: string[]): Promise<Role>;
  abstract deletePermission(permissionId: string): Promise<void>;
  abstract getAllPermissions(): Promise<Permission[]>;
}
