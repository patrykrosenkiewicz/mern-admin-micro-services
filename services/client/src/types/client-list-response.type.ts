import { Client } from '../dto/schemas/client.schema';

export type ClientListResponse = {
  data: Client[];
  count: number;
  status: number;
};
