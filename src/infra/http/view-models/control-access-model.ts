import { Role } from '@application/entities/role';

export class ControlAccessModel {
  static toRoleHTTP(role: Role) {
    return role.name;
  }
}
