import { Video } from '@application/entities/video';
import { VideoRepository } from '@application/repositories/video-repository';
import { PrismaVideoMapper } from '../mappers/prisma-video-mapper';
import { PrismaService } from '../prisma.service';

export class PrismaVideoRepository implements VideoRepository {
  constructor(private prisma: PrismaService) {}

  async findById(videoId: string): Promise<Video | null> {
    const video = await this.prisma.video.findUnique({
      where: { id: videoId },
    });
    if (!video) return null;

    return PrismaVideoMapper.toDomain(video);
  }
  async findMany(findManyById: string): Promise<Video[]> {
    const videos = await this.prisma.video.findMany({
      where: {
        OR: [
          {
            id: findManyById,
          },
          {
            movieId: findManyById,
          },
          {
            episodeId: findManyById,
          },
        ],
      },
    });

    return videos.map(PrismaVideoMapper.toDomain);
  }

  async create(video: Video): Promise<void> {
    const raw = PrismaVideoMapper.toPrisma(video);
    const connectToRelationship =
      raw.format == 'movie'
        ? {
            movie: {
              connect: { id: raw.id },
            },
          }
        : {
            episode: {
              connect: { id: raw.id },
            },
          };
    await this.prisma.video.create({
      data: {
        ...raw,
        ...connectToRelationship,
      },
    });
  }
  async save({ videoId, content }: { videoId: string; content: Video }): Promise<void> {
    const raw = PrismaVideoMapper.toPrisma(content);
    await this.prisma.video.updateMany({
      where: { id: videoId },
      data: raw,
    });
  }

  async remove(videoId: string): Promise<void> {
    await this.prisma.video.delete({ where: { id: videoId } });
  }
}
