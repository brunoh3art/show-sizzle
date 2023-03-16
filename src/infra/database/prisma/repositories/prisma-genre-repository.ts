import { Genre } from '@application/entities/genre';
import { GenreRepository, GenreRequest, GenreResponse } from '@application/repositories/genre-repository';
import { Injectable } from '@nestjs/common';
import { PrismaGenreMapper } from '../mappers/prisma-genre-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaGenreRepository implements GenreRepository {
  constructor(private prisma: PrismaService) {}

  async findByName(content: string): Promise<Genre | null> {
    const genre = await this.prisma.genre.findUnique({ where: { title: content } });

    if (!genre) return null;

    return PrismaGenreMapper.toDomain(genre);
  }
  async findMany({ skip, take, genre }: GenreRequest): Promise<GenreResponse> {
    console.log({ findMany: 'a' });

    const [items, count] = await this.prisma.$transaction([
      this.prisma.genre.findMany({
        skip,
        take,
        where: { title: { contains: genre } },
      }),

      this.prisma.genre.count({
        take: undefined,
        skip: undefined,
        where: { title: { contains: genre } },
      }),
    ]);

    return {
      total: count,
      content: items.map(PrismaGenreMapper.toDomain),
    };
  }
  async create(content: Genre): Promise<void> {
    const raw = PrismaGenreMapper.toPrisma(content);
    await this.prisma.genre.create({ data: raw });
  }
  async save(genreId: string, content: Genre): Promise<void> {
    const raw = PrismaGenreMapper.toPrisma(content);
    await this.prisma.genre.update({ where: { id: genreId }, data: raw });
  }
  async remove(content: string): Promise<void> {
    await this.prisma.genre.delete({ where: { id: content } });
  }
}
