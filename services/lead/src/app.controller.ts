import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/service/lead')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('create')
  async createLead(@Body() leadData: any): Promise<any> {
    return 'create(leadData)';
  }

  @Get('read/:id')
  async getLeadById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return 'read(id)';
  }

  @Patch('update/:id')
  async updateLead(
    @Param('id', ParseIntPipe) id: number,
    @Body() leadData: any,
  ): Promise<any> {
    return 'update(id, leadData)';
  }

  @Delete('delete/:id')
  async deleteLead(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return 'delete(id)';
  }

  @Get('search')
  async searchLeads(@Query() query: any): Promise<any> {
    return 'search(query)';
  }

  @Get('list')
  async listLeads(): Promise<any> {
    return 'list()';
  }
}
