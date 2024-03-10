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

@Controller('/service/product')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  async createProduct(@Body() productData: any): Promise<any> {
    return 'this.productController.create(productData)';
  }

  @Get('read/:id')
  async getProductById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return 'this.productController.read(id)';
  }

  @Patch('update/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productData: any,
  ): Promise<any> {
    return 'this.productController.update(id, productData)';
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return 'this.productController.delete(id)';
  }

  @Get('search')
  async searchProducts(@Query() query: any): Promise<any> {
    return 'this.productController.search(query)';
  }

  @Get('list')
  async listProducts(): Promise<any> {
    return 'this.productController.list()';
  }
}
