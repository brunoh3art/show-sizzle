import { Role } from '@application/entities/role';
import { ControlAccessRepository } from '@application/repositories/control-access-repository';
import { Injectable } from '@nestjs/common';

interface Request {
  roleId: string;
  permissions: string[];
}
interface Response {
  role: Role;
}

@Injectable()
export class AddPermissionRole {
  constructor(private controlAccessRepository: ControlAccessRepository) {}

  async execute(request: Request): Promise<Response> {
    const { roleId, permissions } = request;

    const response = await this.controlAccessRepository.addPermissionRole(roleId, permissions);

    return {
      role: response,
    };
  }
}
