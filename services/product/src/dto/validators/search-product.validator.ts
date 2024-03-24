import { z } from 'zod';

export const searchProductValidator = z.object({
  fields: z.string(),
  q: z.string(),
});
