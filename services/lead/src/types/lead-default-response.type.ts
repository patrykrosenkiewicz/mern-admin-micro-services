import { Lead } from '../dto/schemas/lead.schema';

export type LeadResponse = {
  success: boolean;
  result: Lead | Lead[];
  message: string;
};
