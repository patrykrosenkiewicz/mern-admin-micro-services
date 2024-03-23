import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead } from './dto/schemas/lead.schema';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadListResponse } from './types/lead-list-response.type';
import { LeadResponse } from './types/lead-default-response.type';
import { SearchLeadDto } from './dto/search-lead.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Lead.name) private readonly leadModel: Model<Lead>,
  ) {}

  async create(leadData: CreateLeadDto): Promise<LeadResponse> {
    const createdLead = new this.leadModel(leadData);
    const result = await createdLead.save();
    return {
      result,
      message: 'Successfully Created the document in Model ',
      success: true,
    };
  }

  async getLeadById(id: string): Promise<LeadResponse> {
    const result = await this.leadModel.findById(id).exec();
    return {
      result,
      message: 'Successfully Created the document in Model ',
      success: true,
    };
  }

  async updateLead(
    id: string,
    updateLeadData: UpdateLeadDto,
  ): Promise<LeadResponse> {
    const result = await this.leadModel
      .findByIdAndUpdate(id, updateLeadData, { new: true })
      .exec();
    if (!result) {
      throw new NotFoundException(`Lead #${id} not found`);
    }
    return {
      result,
      message: 'Successfully updated the document in Model ',
      success: true,
    };
  }

  async deleteLead(id: string): Promise<LeadResponse> {
    const result = await this.leadModel.findByIdAndDelete(id).exec();
    return {
      result,
      message: 'Successfully deleted the document in Model ',
      success: true,
    };
  }

  async searchLeads(query: SearchLeadDto): Promise<LeadResponse> {
    const fieldsArray = query.fields.split(',');

    const fields = { $or: [] };

    for (const field of fieldsArray) {
      fields.$or.push({ [field]: { $regex: new RegExp(query.q, 'i') } });
    }

    const result = await this.leadModel.find(fields).exec();
    return {
      result,
      message: 'Successfully Searched the document in Model ',
      success: true,
    };
  }

  async listLeads(page: number, limit: number): Promise<LeadListResponse> {
    const skip = (page - 1) * limit;
    const count = await this.leadModel.countDocuments({}).exec();
    const page_total = Math.floor((count - 1) / limit) + 1;
    const data = await this.leadModel.find().limit(limit).skip(skip).exec();
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
