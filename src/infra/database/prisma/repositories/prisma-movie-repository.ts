import { Content } from '@application/entities/content';
import { MovieRepository } from '@application/repositories/movie-repository';
import { Injectable } from '@nestjs/common';
import { PrismaContentMapper } from '../mappers/prisma-content-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaMovieRepository implements MovieRepository {
  constructor(private prisma: PrismaService) {}
  findById(content: string): Promise<Content> {
    throw new Error('Method not implemented.');
  }

  async create(content: Content): Promise<void> {
    const raw = PrismaContentMapper.toPrisma(content);
    await this.prisma.movie.create({
      data: raw,
    });
  }
}
