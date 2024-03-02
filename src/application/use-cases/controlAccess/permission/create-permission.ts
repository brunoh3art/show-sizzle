import { Permission } from '@application/entities/permission';
import { ControlAccessRepository } from '@application/repositories/control-access-repository';
import { Injectable } from '@nestjs/common';

interface Request {
  name: string;
}
interface Response {
  permission: Permission;
}

@Injectable()
export class CreatePermission {
  constructor(private controlAccessRepository: ControlAccessRepository) {}

  async execute(request: Request): Promise<Response> {
    const { name } = request;
    const permission = new Permission({ name });
    await this.controlAccessRepository.createPermission(permission);

    return {
      permission: permission,
    };
  }
}
