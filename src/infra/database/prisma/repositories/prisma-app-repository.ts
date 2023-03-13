import { AppRepository } from '@application/repositories/app-repository';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAppRepository implements AppRepository {
  constructor(private prisma: PrismaService) {}

  async browseByGenre(genre: string, page: number, pageSize: number) {
    // Get total count of movies and TV shows for the genre
    const totalCount = await this.prisma.$queryRaw`
    SELECT COUNT(*) FROM (
      SELECT m.id FROM movie m
      JOIN genre g ON m.id = g.movieId
      WHERE g.title = ${genre}
      UNION ALL
      SELECT t.id FROM tvshow t
      JOIN genre g ON t.id = g.tvShowId
      WHERE g.title = ${genre}
    ) as results
`;

    const count = parseInt(totalCount[0].count);
    const offset = (page - 1) * pageSize;

    const results = await this.prisma.$queryRaw(Prisma.sql`
        SELECT * FROM (
          SELECT m.id, m.title, m.original_title, m.poster_image, g.title AS genre FROM movie m
          JOIN genre g ON m.id = g.movieId
          WHERE g.title = ${genre}
          UNION ALL
          SELECT t.id, t.title, t.original_title, t.poster_image, g.title  AS genre FROM tvshow t
          JOIN genre g ON t.id = g.tvShowId
          WHERE g.title = ${genre}
        ) as results
        ORDER BY title ASC
        LIMIT ${pageSize} OFFSET ${offset}
      `);

    return {
      page: page,
      count,
      results,
    };
  }

  async browse() {
    const moviesAndTvShows: any = await this.prisma.$queryRaw(Prisma.sql`
      SELECT 
      m.id, m.title, m.original_title, m.poster_image, g.title 
      AS genre FROM movie m
      JOIN genre g ON m.id = g.movieId
       UNION ALL
       SELECT 
       t.id, t.title, t.original_title, t.poster_image, g.title 
       AS genre FROM tvshow t
        JOIN genre g ON t.id = g.tvShowId WHERE g.title IS NOT NULL
        LIMIT 25
            `);

    return moviesAndTvShows;
  }
}
