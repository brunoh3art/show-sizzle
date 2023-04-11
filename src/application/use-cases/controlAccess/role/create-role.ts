import { Role } from '@application/entities/role';
import { ControlAccessRepository } from '@application/repositories/control-access-repository';
import { Injectable } from '@nestjs/common';

interface Request {
  name: string;
}
interface Response {
  role: Role;
}

@Injectable()
export class CreateRole {
  constructor(private controlAccessRepository: ControlAccessRepository) {}

  async execute(request: Request): Promise<Response> {
    const { name } = request;
    const role = new Role({ name });
    await this.controlAccessRepository.createRole(role);

    return {
      role: role,
    };
  }
}
