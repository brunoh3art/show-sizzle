import { Role } from '@application/entities/role';
import { ControlAccessRepository } from '@application/repositories/control-access-repository';
import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Request {
  roleId: string;
}

interface Response {
  roles: Role[];
}

@Injectable()
export class DeleteRole {
  constructor(private controlAccessRepository: ControlAccessRepository) {}

  async execute(request: Request): Promise<Response> {
    const { roleId } = request;

    await this.controlAccessRepository.deleteRole(roleId);

    return;
  }
}
