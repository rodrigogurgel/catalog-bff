import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async create(
    @Headers('Store-Id') storeId: string,
    @Body() category: CreateCategoryDto,
  ) {
    return await this.categoryService.create(storeId, category);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async patch(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() category: CreateCategoryDto,
  ) {
    return await this.categoryService.patch(storeId, id, category);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async update(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() category: CreateCategoryDto,
  ) {
    return await this.categoryService.update(storeId, id, category);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async remove(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.categoryService.remove(storeId, id);
  }
}
