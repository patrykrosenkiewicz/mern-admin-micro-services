import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ClientCustomField } from './client-custom-field.schema';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true })
export class Client {
  enabled: string;
  @Prop({ required: true })
  company: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  surname: string;
  @Prop({ required: true })
  bankAccount: string;
  @Prop({ required: true })
  companyRegNumber: string;
  @Prop({ required: true })
  companyTaxNumber: string;
  @Prop({ required: true })
  companyTaxID: string;
  @Prop({ required: true })
  customField: ClientCustomField;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  country: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  website: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
