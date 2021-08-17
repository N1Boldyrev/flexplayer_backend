import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { Title, TitleDocument } from './schemas/title.schema';
import { Model } from 'mongoose';
import { CreateTitleDto } from './dto/create-title.dto';
import { Season } from './schemas/season.schema';
import { Episode } from './schemas/episode.schema';

@Injectable()
export class TitleService {
  constructor(@InjectModel(Title.name) private titleModel: Model<TitleDocument>) {}

  async createTitle(createTitleDto: CreateTitleDto): Promise<Title> {
    const createTitle = new this.titleModel(createTitleDto);
    return createTitle.save();
  }

  async getAllTitles(): Promise<Title[]> {
    return this.titleModel.find().exec();
  }

  async updateSeasonsInTitle(titleName: string, titlePath: string): Promise<Title> {
    const files = fs.readdirSync(`${process.env.FILES_PATH}/${titlePath}`);
    if (files.length > 0) {
      const seasons: Season[] = [];
      files.forEach((file, index) => {
        if (fs.lstatSync(`${process.env.FILES_PATH}/${titlePath}/${file}`).isDirectory())
          seasons.push({ number: index, path: file, episodes: [] });
      });
      if (seasons.length > 0) return this.titleModel.findOneAndUpdate({ name: titleName, seasons: seasons });
      else throw new HttpException('Seasons not found', HttpStatus.NOT_FOUND);
    } else throw new HttpException('Seasons is empty', HttpStatus.NOT_FOUND);
  }

  async updateEpisodesInSeason(titleName: string, seasonNumber: number): Promise<Title> {
    const findTitle = await this.titleModel.findOne({ name: titleName });
    if (findTitle) {
      const findSeasonIndex = findTitle.seasons.findIndex((season) => season.number === seasonNumber);
      if (findSeasonIndex !== -1) {
        const episodes: Episode[] = [];
        const findSeason = findTitle.seasons[findSeasonIndex];
        const files = fs.readdirSync(`${process.env.FILES_PATH}/${findTitle.path}/${findSeason.path}`);
        files.forEach((file) => {
          if (fs.lstatSync(`${process.env.FILES_PATH}/${findTitle.path}/${findSeason.path}/${file}`).isFile())
            episodes.push({ name: file, path: file, fullPath: `${findTitle.path}/${findSeason.path}/${file}` });
        });
        if (episodes.length > 0) {
          findTitle.seasons[findSeasonIndex].episodes = episodes;
          return this.titleModel.findOneAndUpdate({ name: titleName, seasons: findTitle.seasons });
        } else throw new HttpException('Season is empty', HttpStatus.NOT_FOUND);
      } else throw new HttpException('Season not found', HttpStatus.NOT_FOUND);
    } else throw new HttpException('Title not found', HttpStatus.NOT_FOUND);
  }
}
