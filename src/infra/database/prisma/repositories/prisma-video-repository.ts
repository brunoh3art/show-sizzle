import { Video } from '@application/entities/video';
import { VideoRepository } from '@application/repositories/video-repository';
import { Injectable } from '@nestjs/common';
import { PrismaVideoMapper } from '../mappers/prisma-video-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaVideoRepository implements VideoRepository {
  constructor(private prisma: PrismaService) {}

  async findById(videoId: string): Promise<Video | null> {
    const video = await this.prisma.media.findUnique({
      where: { id: videoId },
    });
    if (!video) return null;

    return PrismaVideoMapper.toDomain(video);
  }
  async findMany(findManyById: string): Promise<Video[]> {
    const videos = await this.prisma.media.findMany({
      where: {
        OR: [
          {
            id: findManyById,
          },
          {
            movie: {
              every: { id: findManyById },
            },
          },
          {
            episode: {
              every: { id: findManyById },
            },
          },
        ],
      },
    });

    return videos.map(PrismaVideoMapper.toDomain);
  }

  async create(content: Video): Promise<void> {
    const raw = PrismaVideoMapper.toPrisma(content);

    const connectToRelationship =
      raw.type == 'movie' ? { movie: { connect: { id: raw.id } } } : { episode: { connect: { id: raw.id } } };

    await this.prisma.media.create({
      data: { ...raw, ...connectToRelationship },
    });
  }

  async save({ videoId, content }: { videoId: string; content: Video }): Promise<void> {
    const raw = PrismaVideoMapper.toPrisma(content);
    await this.prisma.media.updateMany({
      where: { id: videoId },
      data: raw,
    });
  }

  async remove(videoId: string): Promise<void> {
    await this.prisma.media.delete({ where: { id: videoId } });
  }
}
