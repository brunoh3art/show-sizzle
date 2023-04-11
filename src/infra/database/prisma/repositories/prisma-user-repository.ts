import { User } from '@application/entities/user';
import { UserRepository, UserResponse } from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';
@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
  async findById(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
  findMany(skip: number, take: number): Promise<UserResponse> {
    throw new Error('Method not implemented.');
  }
  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.create({
      data: data,
    });
  }
  save(userId: string, content: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async remove(userId: string): Promise<void> {
    await this.prisma.user.delete({ where: { id: userId } });
  }
}
