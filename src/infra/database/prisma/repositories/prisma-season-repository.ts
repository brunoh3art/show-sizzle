import { Season } from '@application/entities/season';
import { SeasonRepository, SeasonResponse } from '@application/repositories/season-repository';
import { PrismaSeasonMapper } from '../mappers/prisma-season-mapper';
import { PrismaService } from '../prisma.service';

export class PrismaSeasonRepository implements SeasonRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(seasonId: string): Promise<Season | null> {
    const season = await this.prisma.season.findUnique({ where: { id: seasonId } });

    if (!season) return null;

    return PrismaSeasonMapper.toDomain(season);
  }

  async findMany(skip: number, take: number): Promise<SeasonResponse> {
    const [seasons, total] = await this.prisma.$transaction([
      this.prisma.season.findMany({
        skip,
        take,
      }),
      this.prisma.season.count({ skip: undefined, take: undefined }),
    ]);
    return {
      seasons: seasons.map((season) => PrismaSeasonMapper.toDomain(season)),
      total,
    };
  }

  async create(content: Season): Promise<void> {
    const raw = PrismaSeasonMapper.toPrisma(content);

    await this.prisma.season.create({
      data: raw,
    });
  }
  async save(seasonId: string, content: Season): Promise<void> {
    const raw = PrismaSeasonMapper.toPrisma(content);
    await this.prisma.season.update({ where: { id: seasonId }, data: raw });
  }
  async remove(seasonId: string): Promise<void> {
    await this.prisma.season.delete({ where: { id: seasonId } });
  }
}
