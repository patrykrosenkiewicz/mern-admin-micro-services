import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './dto/schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

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
    updateClientData: UpdateClientDto,
  ): Promise<Client | null> {
    const updatedClient = await this.clientModel
      .findByIdAndUpdate(id, updateClientData, { new: true })
      .exec();
    if (!updatedClient) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    return updatedClient;
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
