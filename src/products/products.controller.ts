import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(@Query('type') type: string, @Query('filter') filter: string, @Query('sort') sort:string): Product[] {
    return this.productsService.getAll(type, filter, sort);
  }

  @Get(':id')
  getOne(@Param('id') productId: number): Product {
    return this.productsService.getOne(productId);
  }

  @Post()
  create(@Body() productData: CreateProductDto) {
    return this.productsService.create(productData);
  }

  @Delete(':id')
  remove(@Param('id') productId: number) {
    return this.productsService.deleteOne(productId);
  }

  @Put(':id')
  put(@Param('id') productId: number, @Body() updateData: UpdateProductDto) {
    return this.productsService.update(productId, updateData);
  }

  @Patch(':id/like')
  patch(@Param('id') productId: number) {
    return this.productsService.updatelike(productId);
  }
}