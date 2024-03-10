import { z } from 'zod';

const ClientCustomField = z.object({
  fieldName: z.string(),
  fieldValue: z.string(),
});
export const createClientSchema = z
  .object({
    enabled: z.string(),
    company: z.string(),
    name: z.string(),
    surname: z.string(),
    bankAccount: z.string(),
    companyRegNumber: z.string(),
    companyTaxNumber: z.string(),
    companyTaxID: z.string(),
    customField: ClientCustomField,
    address: z.string(),
    country: z.string(),
    phone: z.string(),
    email: z.string().email(),
    website: z.string().url(),
  })
  .required();
