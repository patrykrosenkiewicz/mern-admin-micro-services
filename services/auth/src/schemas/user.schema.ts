import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ default: false })
  removed: boolean;

  @Prop({ default: true })
  enabled: boolean;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, trim: true })
  photo: string;

  @Prop({ default: false })
  isLoggedIn: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
