import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './dto/schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientListResponse } from './types/client-list-response.type';
import { ClientResponse } from './types/client-default-response.type';
import { SearchClientDto } from './dto/search-client.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
  ) {}

  async create(clientData: CreateClientDto): Promise<ClientResponse> {
    const createdClient = new this.clientModel(clientData);
    const result = await createdClient.save();
    return {
      result,
      message: 'Successfully Created the document in Model ',
      success: true,
    };
  }

  async getClientById(id: string): Promise<ClientResponse> {
    const result = await this.clientModel.findById(id).exec();
    return {
      result,
      message: 'Successfully Created the document in Model ',
      success: true,
    };
  }

  async updateClient(
    id: string,
    updateClientData: UpdateClientDto,
  ): Promise<ClientResponse> {
    const result = await this.clientModel
      .findByIdAndUpdate(id, updateClientData, { new: true })
      .exec();
    if (!result) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    return {
      result,
      message: 'Successfully updated the document in Model ',
      success: true,
    };
  }

  async deleteClient(id: string): Promise<ClientResponse> {
    const result = await this.clientModel.findByIdAndDelete(id).exec();
    return {
      result,
      message: 'Successfully deleted the document in Model ',
      success: true,
    };
  }

  async searchClients(query: SearchClientDto): Promise<ClientResponse> {
    const fieldsArray = query.fields.split(',');

    const fields = { $or: [] };

    for (const field of fieldsArray) {
      fields.$or.push({ [field]: { $regex: new RegExp(query.q, 'i') } });
    }

    const result = await this.clientModel.find(fields).exec();
    return {
      result,
      message: 'Successfully Searched the document in Model ',
      success: true,
    };
  }

  async listClients(page: number, limit: number): Promise<ClientListResponse> {
    const skip = (page - 1) * limit;
    // return await this.clientModel.find().skip(skip).limit(limit).exec();
    const count = await this.clientModel.countDocuments({}).exec();
    const page_total = Math.floor((count - 1) / limit) + 1;
    const data = await this.clientModel.find().limit(limit).skip(skip).exec();
    const message = data.length === 0 ? 'Collection empty' : 'Success';
    return {
      result: data,
      pagination: {
        page: String(page),
        pages: page_total,
        count,
      },
      message: message,
      success: true,
    };
  }
}
