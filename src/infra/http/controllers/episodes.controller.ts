import { Controller, Get, Param } from '@nestjs/common';

@Controller('episodes')
export class EpisodesController {
  @Get(':id')
  async episode(@Param('id') id: string) {
    return id;
  }
}
