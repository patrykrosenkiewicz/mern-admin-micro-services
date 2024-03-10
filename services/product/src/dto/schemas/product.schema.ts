import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ default: true })
  enabled: boolean;

  @Prop({ required: true, trim: true })
  productName: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ number: true })
  price: string;

  @Prop({ default: 'available' }) //TODO move to enum
  status: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
