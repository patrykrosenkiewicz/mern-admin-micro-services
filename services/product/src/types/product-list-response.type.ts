import { Product } from '../dto/schemas/product.schema';

export type ProductListResponse = {
  result: Product[];
  pagination: {
    page: string;
    pages: number;
    count: number;
  };
  message: string;
  success: boolean;
};
