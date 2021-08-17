import { Body, Controller, Get, Patch, Post, Query, UseFilters } from '@nestjs/common';
import { TitleService } from './title.service';
import { Title } from './schemas/title.schema';
import { CreateTitleDto } from './dto/create-title.dto';
import { MongoFilter } from '../utils/mongo-exeption.filter';

@Controller('title')
export class TitleController {
  constructor(private titleService: TitleService) {}

  @Get()
  async loadAllTitles(): Promise<Title[]> {
    return this.titleService.getAllTitles();
  }

  @Post()
  @UseFilters(MongoFilter)
  async createTitle(@Body() createTitleDto: CreateTitleDto): Promise<Title> {
    return this.titleService.createTitle(createTitleDto);
  }

  @Patch()
  @UseFilters(MongoFilter)
  async updateTitle(@Query('titleName') titleName: string, @Query('path') path: string): Promise<Title> {
    return this.titleService.updateSeasonsInTitle(titleName, path);
  }

  @Patch('/season')
  @UseFilters(MongoFilter)
  async updateSeason(
    @Query('titleName') titleName: string,
    @Query('seasonNumber') seasonNumber: number
  ): Promise<Title> {
    return this.titleService.updateEpisodesInSeason(titleName, Number(seasonNumber));
  }
}
