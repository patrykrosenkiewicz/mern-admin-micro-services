import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientCustomFieldDocument = HydratedDocument<ClientCustomField>;

@Schema({ timestamps: true })
export class ClientCustomField {
  @Prop({ trim: true })
  fieldName: string;

  @Prop({ trim: true })
  fieldValue: string;
}

export const ClientCustomFieldSchema =
  SchemaFactory.createForClass(ClientCustomField);
