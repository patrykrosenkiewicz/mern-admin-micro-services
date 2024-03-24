import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './dto/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductListResponse } from './types/product-list-response.type';
import { ProductResponse } from './types/product-default-response.type';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(productData: CreateProductDto): Promise<ProductResponse> {
    const createdProduct = new this.productModel(productData);
    const result = await createdProduct.save();
    return {
      result,
      message: 'Successfully Created the document in Model ',
      success: true,
    };
  }

  async getProductById(id: string): Promise<ProductResponse> {
    const result = await this.productModel.findById(id).exec();
    return {
      result,
      message: 'Successfully Created the document in Model ',
      success: true,
    };
  }

  async updateProduct(
    id: string,
    updateProductData: UpdateProductDto,
  ): Promise<ProductResponse> {
    const result = await this.productModel
      .findByIdAndUpdate(id, updateProductData, { new: true })
      .exec();
    if (!result) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return {
      result,
      message: 'Successfully updated the document in Model ',
      success: true,
    };
  }

  async deleteProduct(id: string): Promise<ProductResponse> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    return {
      result,
      message: 'Successfully deleted the document in Model ',
      success: true,
    };
  }

  async searchProducts(query: SearchProductDto): Promise<ProductResponse> {
    const fieldsArray = query.fields.split(',');

    const fields = { $or: [] };

    for (const field of fieldsArray) {
      fields.$or.push({ [field]: { $regex: new RegExp(query.q, 'i') } });
    }

    const result = await this.productModel.find(fields).exec();
    return {
      result,
      message: 'Successfully Searched the document in Model ',
      success: true,
    };
  }

  async listProducts(
    page: number,
    limit: number,
  ): Promise<ProductListResponse> {
    const skip = (page - 1) * limit;
    const count = await this.productModel.countDocuments({}).exec();
    const page_total = Math.floor((count - 1) / limit) + 1;
    const data = await this.productModel.find().limit(limit).skip(skip).exec();
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
