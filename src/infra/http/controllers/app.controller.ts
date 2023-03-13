import { AppBrowse } from '@application/use-cases/app/app-browse';
import { AppBrowseByGenre } from '@application/use-cases/app/app-browse-by-genre';
import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private appBrowse: AppBrowse, private appBrowseByGenre: AppBrowseByGenre) {}

  @Get('browse')
  async getHome() {
    const { browse } = await this.appBrowse.execute();
    return { browse };
  }
  @Get('browse/genre/:name')
  async getByGenre(@Param('name') name: string) {
    const data = await this.appBrowseByGenre.execute({ name });
    return data;
  }

  @Get('base')
  async baseApp() {
    return {
      isAds: true,
      isLoginsEnabled: true,
    };
  }
}
