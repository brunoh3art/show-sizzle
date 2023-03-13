import { AppRepository } from '@application/repositories/app-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppBrowse {
  constructor(private appRepository: AppRepository) {}

  async execute() {
    const data = await this.appRepository.browse();
    return { browse: data };
  }

  private groupByCategory(result: any) {
    const resultsByGenre = {};
    result.forEach((row) => {
      const genre = row.genre;

      const item = {
        id: row.id,
        title: row.title,
        original_title: row.original_title,
        poster_image: row.poster_image,
      };

      if (!resultsByGenre[genre]) {
        resultsByGenre[genre] = {
          title: genre,
          items: [item],
        };
      } else {
        resultsByGenre[genre].items.push(item);
      }
    });

    const transformedResults = Object.values(resultsByGenre).map((result: any) => {
      return {
        title: result.title,
        items: result.items.map((item) => {
          return {
            id: item.id,
            title: item.title,
            original_title: item.original_title,
            poster_image: item.poster_image,
          };
        }),
      };
    });

    return transformedResults;
  }
}
