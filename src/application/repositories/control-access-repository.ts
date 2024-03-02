import { Permission } from '@application/entities/permission';
import { Role } from '@application/entities/role';

export abstract class ControlAccessRepository {
  abstract getUniqueRoleById(roleId: string): Promise<Role>;
  abstract getUniqueRoleByName(role: string): Promise<Role>;

  abstract createRole(role: Role): Promise<void>;
  abstract deleteRole(roleId: string): Promise<void>;
  abstract getAllRoles(): Promise<Role[]>;

  abstract getUniquePermissionById(permissionId: string): Promise<Permission | null>;
  abstract getUniquePermissionByName(name: string): Promise<Permission | null>;

  abstract createPermission(permission: Permission): Promise<void>;
  abstract addPermissionRole(roleId: string, permission: string[]): Promise<Role>;
  abstract deletePermission(permissionId: string): Promise<void>;
  abstract getAllPermissions(): Promise<Permission[]>;
}
