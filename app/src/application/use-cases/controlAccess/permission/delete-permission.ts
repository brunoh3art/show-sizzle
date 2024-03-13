/* eslint-disable @typescript-eslint/no-empty-interface */
import { ControlAccessRepository } from '@application/repositories/control-access-repository';
import { Injectable } from '@nestjs/common';

interface Request {
  permissionId: string;
}

@Injectable()
export class DeletePermission {
  constructor(private controlAccessRepository: ControlAccessRepository) {}

  async execute(request: Request): Promise<void> {
    const { permissionId } = request;

    await this.controlAccessRepository.deletePermission(permissionId);

    return;
  }
}
