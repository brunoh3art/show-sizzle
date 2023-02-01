import { Content } from '@application/entities/content';

export class PrismaContentMapper {
  static toPrisma(content: Content) {
    return {
      id: content.id,
      title: content.title.value,
      original_title: content.original_title.value,
      overview: content.overview,
      release_date: content.release_date,
      poster_image: content.poster_image,
      background_image: content.background_image,
      published: content.published,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
    };
  }
}
