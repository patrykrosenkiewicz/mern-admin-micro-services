import { Client } from '../dto/schemas/client.schema';

export type ClientResponse = {
  success: boolean;
  result: Client | Client[];
  message: string;
};
