import { AddPermissionRole, CreateRole } from '@application/use-cases/controlAccess/role';

import { CreatePermission } from '@application/use-cases/controlAccess/permission';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { PermissionDTOS } from '../dtos/permission';
import { RoleDTOS, RolePermission } from '../dtos/role';

@Controller('permissions')
export class ControlAccessController {
  constructor(
    private addRole: CreateRole,
    private addPermissionRole: AddPermissionRole,
    private createPermission: CreatePermission,
  ) {}

  @Post('permission')
  async addPermission(@Body() body: PermissionDTOS) {
    const { name } = body;

    const { permission } = await this.createPermission.execute({ name });
    return { permission };
  }

  @Post('role')
  async createRole(@Body() body: RoleDTOS) {
    const { name } = body;

    const { role } = await this.addRole.execute({ name });
    return { role };
  }

  @Put('role/:id')
  async updatePermissionRole(@Param('id') id: string, @Body() body: RolePermission) {
    const { permissions } = body;

    const { role } = await this.addPermissionRole.execute({ roleId: id, permissions });
    return { role };
  }
}
