import { AppBrowse } from '@application/use-cases/app/app-browse';
import { AppBrowseByGenre } from '@application/use-cases/app/app-browse-by-genre';
import { Controller, Get, Param } from '@nestjs/common';
import { MovieViewModel } from '../view-models/movie-view-model';

@Controller()
export class AppController {
  constructor(private appBrowse: AppBrowse, private appBrowseByGenre: AppBrowseByGenre) {}

  @Get('browse')
  async getHome() {
    const { browse } = await this.appBrowse.execute();
    return {
      browse: browse.map((x) => {
        return {
          title: x.title,
          items: x.items.map(MovieViewModel.toHTTP),
        };
      }),
    };
  }
  @Get('browse/genre/:name')
  async getByGenre(@Param('name') name: string) {
    const data = await this.appBrowseByGenre.execute({ name });
    return {
      count: data.browse.count,
      browse: data.browse.results.map(MovieViewModel.toHTTP),
    };
  }

  @Get('base')
  async baseApp() {
    return {
      isAds: true,
      isLoginsEnabled: true,
    };
  }
}
