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
import { CreateClientDto } from './dto/create-client.dto';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { createClientSchema } from './dto/validators/create-client.validator';
import { Client } from './dto/schemas/client.schema';

@Controller('/service/client')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  @UsePipes(new ZodValidationPipe(createClientSchema))
  async createClient(@Body() clientData: CreateClientDto): Promise<Client> {
    return this.appService.create(clientData);
  }

  @Get('read/:id')
  async getClientById(@Param('id') id: string): Promise<Client> {
    return this.appService.getClientById(id);
  }

  @Patch('update/:id')
  async updateClient(
    @Param('id') id: string,
    @Body() clientData: CreateClientDto,
  ): Promise<Client> {
    return this.appService.updateClient(id, clientData);
  }

  @Delete('delete/:id')
  async deleteClient(@Param('id') id: string): Promise<Client> {
    return this.appService.deleteClient(id);
  }

  @Get('search')
  async searchClients(@Query() query: any): Promise<Client[]> {
    return this.appService.searchClients(query);
  }

  @Get('list')
  async listClients(): Promise<Client[]> {
    return this.appService.listClients();
  }
}
