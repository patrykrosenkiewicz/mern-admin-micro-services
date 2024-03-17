import { Client } from '../dto/schemas/client.schema';

export type ClientListResponse = {
  result: Client[];
  pagination: {
    page: string;
    pages: number;
    count: number;
  };
  message: string;
  success: boolean;
};
