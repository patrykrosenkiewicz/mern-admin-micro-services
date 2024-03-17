import { z } from 'zod';

const ClientCustomField = z.object({
  fieldName: z.string().default(''),
  fieldValue: z.string().default(''),
});
export const createClientSchema = z.object({
  enabled: z.string().optional().default(''),
  company: z.string(),
  name: z.string(),
  surname: z.string(),
  bankAccount: z.string().optional().default(''),
  companyRegNumber: z.string().optional().default(''),
  companyTaxNumber: z.string().optional().default(''),
  companyTaxID: z.string().optional().default(''),
  customField: ClientCustomField.optional().default({
    fieldName: '',
    fieldValue: '',
  }),
  address: z.string().optional().default(''),
  country: z.string().optional().default(''),
  phone: z.string(),
  email: z.string().email(),
  website: z.string().url().optional(),
});
