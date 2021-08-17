import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EpisodeDocument = Episode & Document;

@Schema()
export class Episode {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  path: string;

  @Prop({ required: true, unique: true })
  fullPath: string;

  @Prop()
  image?: string;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
