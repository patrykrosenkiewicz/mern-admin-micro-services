import { z } from 'zod';

export const searchClientValidator = z.object({
  fields: z.string(),
  q: z.string(),
});
