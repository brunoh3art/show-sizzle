import { Season } from '@application/entities/season';
import { SeasonRepository, SeasonResponse } from '@application/repositories/season-repository';
import { PrismaService } from '../prisma.service';

export class PrismaSeasonRepository implements SeasonRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(seasonId: string): Promise<Season> {
    const season = await this.prisma.season.findUnique({ where: { id: seasonId } });
    throw new Error('Method not implemented.');
  }
  async findMany(skip: number, take: number): Promise<SeasonResponse> {
    throw new Error('Method not implemented.');
  }
  async create(content: Season): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async save(seasonId: string, content: Season): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async remove(content: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
