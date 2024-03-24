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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { createProductSchema } from './dto/validators/create-product.validator';
import { ProductResponse } from './types/product-default-response.type';
import { ProductListResponse } from './types/product-list-response.type';
import { paginationValidator } from './dto/validators/pagination.validator';

@Controller('/service/product')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('create')
  @UsePipes(new ZodValidationPipe(createProductSchema))
  async createProduct(
    @Body() productData: CreateProductDto,
  ): Promise<ProductResponse> {
    return this.appService.create(productData);
  }

  @Get('read/:id')
  async getProductById(@Param('id') id: string): Promise<ProductResponse> {
    return this.appService.getProductById(id);
  }

  @Patch('update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductData: UpdateProductDto,
  ): Promise<ProductResponse> {
    return this.appService.updateProduct(id, updateProductData);
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string): Promise<ProductResponse> {
    return this.appService.deleteProduct(id);
  }

  @Get('search')
  async searchProducts(@Query() query: any): Promise<ProductResponse> {
    return this.appService.searchProducts(query);
  }

  @Get('list')
  @UsePipes(new ZodValidationPipe(paginationValidator))
  async listProducts(
    @Query() paginationDto: PaginationDto,
  ): Promise<ProductListResponse> {
    const { page, limit } = paginationDto;
    return this.appService.listProducts(page, limit);
  }
}
