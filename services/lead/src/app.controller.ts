import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { createLeadSchema } from './dto/validators/create-lead.validator';
import { LeadResponse } from './types/lead-default-response.type';
import { LeadListResponse } from './types/lead-list-response.type';
import { paginationValidator } from './dto/validators/pagination.validator';

@Controller('/service/lead')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('create')
  @UsePipes(new ZodValidationPipe(createLeadSchema))
  async createLead(@Body() leadData: CreateLeadDto): Promise<LeadResponse> {
    return this.appService.create(leadData);
  }

  @Get('read/:id')
  async getLeadById(@Param('id') id: string): Promise<LeadResponse> {
    return this.appService.getLeadById(id);
  }

  @Patch('update/:id')
  async updateLead(
    @Param('id') id: string,
    @Body() updateLeadData: UpdateLeadDto,
  ): Promise<LeadResponse> {
    return this.appService.updateLead(id, updateLeadData);
  }

  @Delete('delete/:id')
  async deleteLead(@Param('id') id: string): Promise<LeadResponse> {
    return this.appService.deleteLead(id);
  }

  @Get('search')
  async searchLeads(@Query() query: any): Promise<LeadResponse> {
    return this.appService.searchLeads(query);
  }

  @Get('list')
  @UsePipes(new ZodValidationPipe(paginationValidator))
  async listLeads(
    @Query() paginationDto: PaginationDto,
  ): Promise<LeadListResponse> {
    const { page, limit } = paginationDto;
    return this.appService.listLeads(page, limit);
  }
}
