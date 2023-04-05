import { CreateSeason } from '@application/use-cases/season/create-season';
import { DeleteSeason } from '@application/use-cases/season/delete-season';
import { FindManySeason } from '@application/use-cases/season/find-many-season';
import { GetSeason } from '@application/use-cases/season/get-season';
import { Body, Controller, Delete, Get, Param, Post, Query, Put } from '@nestjs/common';
import { SeasonDTOS } from '../dtos/season';
import { SeasonViewModel } from '../view-models/season-view-model';
import { UpdateSeason } from '@application/use-cases/season/update-season';

@Controller('seasons')
export class SeasonsController {
  constructor(
    private findManySeason: FindManySeason,
    private getSeason: GetSeason,
    private createSeason: CreateSeason,
    private deleteSeason: DeleteSeason,
    private updateSeason: UpdateSeason,
  ) {}

  @Get(':id')
  async seasons(@Param('id') id: string, @Query() { skip = 0, take = 24 }) {
    const { seasons, total } = await this.findManySeason.execute({ skip, take, tvShowId: id });
    return {
      id,
      seasons: seasons.map(SeasonViewModel.toHTTP),
      total,
    };
  }

  @Get('details/:id')
  async season(@Param('id') id: string) {
    const { season } = await this.getSeason.execute({ seasonId: id });

    return { season: SeasonViewModel.toHTTP(season) };
  }

  @Post(':id')
  async create(@Param('id') id: string, @Body() data: SeasonDTOS) {
    const { title, season_number, poster_image, season_overview, release_date, isPublished } = data;

    const { season } = await this.createSeason.execute({
      tvShowId: id,
      season: { title, season_number, poster_image, season_overview, release_date, isPublished },
    });
    return { season: SeasonViewModel.toHTTP(season) };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: SeasonDTOS) {
    const { title, season_number, poster_image, season_overview, release_date, isPublished } = data;

    const { season } = await this.updateSeason.execute({
      season: { title, season_number, poster_image, season_overview, release_date, isPublished },
      seasonId: id,
    });
    return { season: SeasonViewModel.toHTTP(season) };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteSeason.execute({ seasonId: id });
  }
}
