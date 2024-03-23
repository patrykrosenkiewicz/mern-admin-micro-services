import { Lead } from '../dto/schemas/lead.schema';

export type LeadListResponse = {
  result: Lead[];
  pagination: {
    page: string;
    pages: number;
    count: number;
  };
  message: string;
  success: boolean;
};
