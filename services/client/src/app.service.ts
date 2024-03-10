import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './dto/schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
  ) {}

  async create(clientData: CreateClientDto): Promise<Client> {
    const createdClient = new this.clientModel(clientData);
    return createdClient.save();
  }

  async getClientById(id: string): Promise<Client | null> {
    return this.clientModel.findById(id).exec();
  }

  async updateClient(
    id: string,
    clientData: CreateClientDto,
  ): Promise<Client | null> {
    return this.clientModel
      .findByIdAndUpdate(id, clientData, { new: true })
      .exec();
  }

  async deleteClient(id: string): Promise<Client | null> {
    return this.clientModel.findByIdAndDelete(id).exec();
  }

  async searchClients(query: any): Promise<Client[]> {
    return this.clientModel.find(query).exec();
  }

  async listClients(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }
}
