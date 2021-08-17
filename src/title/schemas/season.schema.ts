import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Episode, EpisodeSchema } from './episode.schema';

export type SeasonDocument = Season & Document;

@Schema()
export class Season {
  @Prop({ required: true, unique: true })
  number: number;

  @Prop()
  size?: number;

  @Prop({ required: true, unique: true })
  path?: string;

  @Prop([{ type: EpisodeSchema }])
  episodes?: Episode[];
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
