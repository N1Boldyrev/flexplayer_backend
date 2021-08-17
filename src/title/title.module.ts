import { Module } from '@nestjs/common';
import { TitleController } from './title.controller';
import { TitleService } from './title.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Title, TitleSchema } from './schemas/title.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Title.name, schema: TitleSchema }])],
  controllers: [TitleController],
  providers: [TitleService],
})
export class TitleModule {}
