import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './dto/schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientListResponse } from './types/client-list-response.type';

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

  async listClients(page: number, limit: number): Promise<ClientListResponse> {
    const skip = (page - 1) * limit;
    // return await this.clientModel.find().skip(skip).limit(limit).exec();
    const count = await this.clientModel.countDocuments({}).exec();
    const page_total = Math.floor((count - 1) / limit) + 1;
    const data = await this.clientModel.find().limit(limit).skip(skip).exec();
    return {
      data: data,
      count: page_total,
      status: 200,
    };
  }
}
