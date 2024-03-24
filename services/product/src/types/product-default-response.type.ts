import { Product } from '../dto/schemas/product.schema';

export type ProductResponse = {
  success: boolean;
  result: Product | Product[];
  message: string;
};
