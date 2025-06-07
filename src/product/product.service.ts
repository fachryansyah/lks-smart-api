import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { GetProductResponse } from './dtos/get-product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getProducts(): Promise<GetProductResponse> {
    const products = await this.productRepository.find();

    return {
      result: products,
      statusCode: 200,
      message: 'Success! Product successfully fetched.',
      error: false,
    };
  }
}
