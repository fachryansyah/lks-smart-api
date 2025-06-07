import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetProductResponse } from './dtos/get-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Product')
@ApiBearerAuth('Authorization')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getProducts(): Promise<GetProductResponse> {
    return await this.productService.getProducts();
  }
}
