import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Headers,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PatchProductDto } from './dto/patch-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async create(
    @Headers('Store-Id') storeId: string,
    @Body() productDto: CreateProductDto,
  ) {
    return await this.productService.create(storeId, productDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async patch(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() productDto: PatchProductDto,
  ) {
    return await this.productService.patch(storeId, id, productDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async update(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() productDto: UpdateProductDto,
  ) {
    return await this.productService.update(storeId, id, productDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async remove(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.productService.remove(storeId, id);
  }
}
