import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    unique: true,
    required: true,
  })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  userPic?: string;

  @Prop({ required: false })
  auth_token?: string;

  @Prop({ required: false })
  refresh_token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
