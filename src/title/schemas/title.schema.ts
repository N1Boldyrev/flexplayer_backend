import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SeasonSchema, Season } from './season.schema';

export type TitleDocument = Title & Document;

@Schema()
export class Title {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  path: string;

  @Prop()
  seasons_count: number;

  @Prop([{ type: SeasonSchema }])
  seasons: Season[];
}

export const TitleSchema = SchemaFactory.createForClass(Title);
