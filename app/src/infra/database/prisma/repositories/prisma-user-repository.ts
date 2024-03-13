import { User } from '@application/entities/user';
import { UserRepository, UserResponse } from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';
@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email: email }, include: { role: true } });
    console.log(user);
    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
  async findById(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, include: { role: true } });
    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
  findMany(skip: number, take: number): Promise<UserResponse> {
    throw new Error('Method not implemented.');
  }
  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    console.log({ user, data });

    await this.prisma.user.create({
      data: {
        ...data,
        role: {
          connectOrCreate: {
            create: data.role,
            where: { name: data.role.name },
          },
        },
      },
      include: { role: true },
    });
  }
  save(userId: string, content: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async remove(userId: string): Promise<void> {
    await this.prisma.user.delete({ where: { id: userId } });
  }
}
