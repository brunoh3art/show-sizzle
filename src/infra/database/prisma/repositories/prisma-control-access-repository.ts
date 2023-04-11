import { Permission } from '@application/entities/permission';
import { Role } from '@application/entities/role';
import { ControlAccessRepository } from '@application/repositories/control-access-repository';
import { Injectable } from '@nestjs/common';
import { PrismaControlAccessMapper } from '../mappers/prisma-control-access.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaControlAccessRepository implements ControlAccessRepository {
  constructor(private prisma: PrismaService) {}

  async createRole(role: Role): Promise<void> {
    const raw = PrismaControlAccessMapper.toPrismaRole(role);

    await this.prisma.userRole.create({ data: raw });
  }
  async deleteRole(roleId: string): Promise<void> {
    await this.prisma.userRole.delete({ where: { id: roleId } });
  }
  async getAllRoles(): Promise<Role[]> {
    const result = await this.prisma.userRole.findMany({ include: { permissions: true } });
    return result.map(PrismaControlAccessMapper.toDomainRole);
  }
  async createPermission(permission: Permission): Promise<void> {
    const raw = PrismaControlAccessMapper.toPrismaPermission(permission);
    await this.prisma.permission.create({ data: raw });
  }
  async addPermissionRole(roleId: string, permission: string[]): Promise<Role> {
    const raw = {
      permissions: {
        connect: permission.map((value) => {
          return {
            id: value,
          };
        }),
      },
    };

    const updated = await this.prisma.userRole.update({
      where: { id: roleId },
      data: raw,
      include: { permissions: true },
    });

    return PrismaControlAccessMapper.toDomainRole(updated);
  }
  async deletePermission(permissionId: string): Promise<void> {
    await this.prisma.permission.delete({ where: { id: permissionId } });
  }
  async getAllPermissions(): Promise<Permission[]> {
    const result = await this.prisma.permission.findMany();
    return result.map(PrismaControlAccessMapper.toDamainPermission);
  }
}
