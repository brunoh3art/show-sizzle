import { Permission } from '@application/entities/permission';
import { Role } from '@application/entities/role';
import { ControlAccessRepository } from '@application/repositories/control-access-repository';
import { Injectable } from '@nestjs/common';
import { PrismaControlAccessMapper } from '../mappers/prisma-control-access.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaControlAccessRepository implements ControlAccessRepository {
  constructor(private prisma: PrismaService) {}

  async getUniqueRoleById(roleId: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({ where: { id: roleId }, include: { permissions: true } });
    if (!role) return null;

    return PrismaControlAccessMapper.toDomainRole(role);
  }
  async getUniqueRoleByName(name: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({ where: { name: name }, include: { permissions: true } });

    console.log(`Role ${role}`);

    if (!role) return null;

    return PrismaControlAccessMapper.toDomainRole(role);
  }

  async createRole(role: Role): Promise<void> {
    const raw = PrismaControlAccessMapper.toPrismaRole(role);

    await this.prisma.role.create({ data: raw });
  }
  async deleteRole(roleId: string): Promise<void> {
    await this.prisma.role.delete({ where: { id: roleId } });
  }
  async getAllRoles(): Promise<Role[]> {
    const result = await this.prisma.role.findMany({ include: { permissions: true } });
    return result.map(PrismaControlAccessMapper.toDomainRole);
  }

  async getUniquePermissionById(permissionId: string): Promise<Permission | null> {
    const permission = await this.prisma.permission.findUnique({
      where: { id: permissionId },
      include: { roles: true },
    });
    if (!permission) return null;

    return PrismaControlAccessMapper.toDamainPermission(permission);
  }
  async getUniquePermissionByName(name: string): Promise<Permission | null> {
    const permission = await this.prisma.permission.findUnique({
      where: { name },
      include: { roles: true },
    });
    if (!permission) return null;

    return PrismaControlAccessMapper.toDamainPermission(permission);
  }

  async createPermission(permission: Permission): Promise<void> {
    const raw = PrismaControlAccessMapper.toPrismaPermission(permission);
    await this.prisma.permission.create({
      data: {
        id: raw.id,
        name: raw.name,
      },
    });
  }
  async addPermissionRole(roleId: string, permission: string[]): Promise<Role> {
    console.log('adding permission', { roleId, permission });

    const updated = await this.prisma.role.update({
      where: { id: roleId },
      data: {
        permissions: {
          connect: permission.map((value) => ({
            id: value,
          })),
        },
      },
      include: {
        permissions: true,
      },
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
