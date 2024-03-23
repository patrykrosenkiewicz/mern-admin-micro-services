import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeadDocument = HydratedDocument<Lead>;

@Schema({ timestamps: true })
export class Lead {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  client: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  budget: string;

  @Prop({ required: true })
  request: string;

  @Prop({ required: true, default: 'PENDING' }) //TODO move to enum
  status: string;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
