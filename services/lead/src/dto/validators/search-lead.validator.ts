import { z } from 'zod';

export const searchLeadValidator = z.object({
  fields: z.string(),
  q: z.string(),
});
