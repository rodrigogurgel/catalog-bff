import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductProducerService } from 'src/config/events/kafka/product-producer/product-producer.service';
import { PatchProductDto } from './dto/patch-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEventDto } from 'src/config/events/kafka/product-producer/dto/product-event.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productProducerService: ProductProducerService,
  ) {}

  async create(storeId: string, productDto: CreateProductDto) {
    await this.productProducerService.create([
      {
        storeId,
        productId: productDto.productId,
        name: productDto.name,
        description: productDto.description,
        image: productDto.image,
      },
    ]);
    return productDto;
  }

  async update(storeId: string, id: string, productDto: UpdateProductDto) {
    await this.productProducerService.update([
      {
        storeId,
        productId: id,
        name: productDto.name,
        description: productDto.description,
        image: productDto.image,
      },
    ]);
  }

  async patch(storeId: string, id: string, productDto: PatchProductDto) {
    await this.productProducerService.patch([
      {
        storeId,
        productId: id,
        name: productDto.name,
        description: productDto.description,
        image: productDto.image,
      },
    ]);
  }

  async remove(storeId: string, id: string) {
    await this.productProducerService.delete([
      {
        productId: id,
        storeId: storeId,
      } as ProductEventDto,
    ]);
  }
}
