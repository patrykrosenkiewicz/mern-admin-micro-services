import { z } from 'zod';

export const createProductSchema = z.object({
  enabled: z.boolean().default(false),
  productName: z.string(),
  description: z.string(),
  price: z.string(),
  status: z.string().default('pending'),
});
