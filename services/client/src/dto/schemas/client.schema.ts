import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ClientCustomField } from './client-custom-field.schema';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true })
export class Client {
  enabled: string;
  @Prop({ required: false })
  company: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  surname: string;
  @Prop({ required: false })
  bankAccount: string;
  @Prop({ required: false })
  companyRegNumber: string;
  @Prop({ required: false })
  companyTaxNumber: string;
  @Prop({ required: false })
  companyTaxID: string;
  @Prop({ required: false })
  customField: ClientCustomField;
  @Prop({ required: false })
  address: string;
  @Prop({ required: false })
  country: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: false })
  website: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
