import { z } from 'zod';

export const loginUserSchema = z
  .object({
    email: z.string(),
    password: z.string().min(1),
  })
  .required();
