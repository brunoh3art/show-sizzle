import { Role } from '@application/entities/role';
import { ControlAccessRepository } from '@application/repositories/control-access-repository';
import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Request {}

interface Response {
  roles: Role[];
}

@Injectable()
export class GetAllRole {
  constructor(private controlAccessRepository: ControlAccessRepository) {}

  async execute(request: Request): Promise<Response> {
    const {} = request;

    const response = await this.controlAccessRepository.getAllRoles();

    return {
      roles: response,
    };
  }
}
