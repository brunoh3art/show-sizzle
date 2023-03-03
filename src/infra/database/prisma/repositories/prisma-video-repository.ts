import { Video } from '@application/entities/video';
import { VideoRepository, VideoResponse } from '@application/repositories/video-repository';
import { Injectable } from '@nestjs/common';
import { PrismaContentMapper } from '../mappers/prisma-content-mapper';
import { PrismaEpisodeMapper } from '../mappers/prisma-episode-mapper';
import { PrismaVideoMapper } from '../mappers/prisma-video-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaVideoRepository implements VideoRepository {
  constructor(private prisma: PrismaService) {}

  async findById(videoId: string): Promise<VideoResponse | null> {
    const video = await this.prisma.media.findUnique({
      where: { id: videoId },
      include: {
        movie: true,
        episode: {
          include: {
            season: {
              include: {
                tvshow: true,
              },
            },
          },
        },
      },
    });

    console.log({ video });

    if (!video) return null;

    return {
      video: PrismaVideoMapper.toDomain(video),
      referece: {
        episode: video.episode.length > 0 && PrismaEpisodeMapper.toDomain(video.episode[0]),
        content:
          video.type == 'movie'
            ? PrismaContentMapper.toDomain(video.movie[0])
            : PrismaContentMapper.toDomain(video.episode[0].season.tvshow),
      },
    };
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
