import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [{
		"id": 1,
		"name": "name",
		"description": "dd",
		"brand": "adi",
		"price": 29000,
		"size": "s",
		"color": "blue",
		"likeCount": 3
	},
	{
		"id": 2,
		"name": "name",
		"description": "dd",
		"brand": "adi",
		"price": 129000,
		"size": "s",
		"color": "blue",
		"likeCount": 1
	},
	{
		"id": 3,
		"name": "name",
		"description": "dd",
		"brand": "adi",
		"price": 1129000,
		"size": "s",
		"color": "blue",
		"likeCount": 1
	}];

  getAll(type: string, filter: string, sort: string): Product[] {
    let result = []
    if (!type) {
      result = this.products;
    } else {
      const products = this.products.filter((product) => {
        return product[type] === filter // name, brand, size, color
      });
      result = products;
    }

    if (sort) {
      if (sort === 'lowPrice') {
        result = result.sort((a, b) => a.price - b.price);
      } else if (sort === 'highPrice') {
        result = result.sort((a, b) => b.price - a.price);
      } else if (sort === 'likeCount') {
        result = result.sort((a, b) => b.likeCount - a.likeCount);
      }
    }

    return result
  }

  getOne(id: number): Product {
    const product = this.products.find((product) => product.id === Number(id));
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.products = this.products.filter((product) => product.id !== Number(id));
  }

  create(productData: CreateProductDto) {
    this.products.push({
      id: this.products.length + 1,
      ...productData,
    });
  }

  update(id: number, updateData: UpdateProductDto) {
    const product = this.getOne(id);
    this.deleteOne(id);
    this.products.push({ ...product, ...updateData });
  }

  updatelike(id: number) {
    const product = this.getOne(id);
    this.deleteOne(id);
    product.likeCount = product.likeCount + 1
    this.products.push({ ...product });
  }
}