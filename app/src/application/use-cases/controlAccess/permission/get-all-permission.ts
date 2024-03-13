import { Permission } from '@application/entities/permission';
import { ControlAccessRepository } from '@application/repositories/control-access-repository';
import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Request {}

interface Response {
  permissions: Permission[];
}

@Injectable()
export class GetAllPermission {
  constructor(private controlAccessRepository: ControlAccessRepository) {}

  async execute(request: Request): Promise<Response> {
    const {} = request;

    const response = await this.controlAccessRepository.getAllPermissions();

    return {
      permissions: response,
    };
  }
}
