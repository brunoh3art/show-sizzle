import { Role } from '@application/entities/role';
import { ControlAccessRepository } from '@application/repositories/control-access-repository';
import { Erros } from '@application/use-cases/errors/errors';
import { Injectable } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

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
    const toUpperCaseName = name.trim().toUpperCase();

    const findRole = await this.controlAccessRepository.getUniqueRoleByName(toUpperCaseName);

    if (findRole) throw new Erros(StatusCodes.CONFLICT, `there already exists a ${name}`);

    const role = new Role({ name: toUpperCaseName });
    await this.controlAccessRepository.createRole(role);

    return {
      role: role,
    };
  }
}
