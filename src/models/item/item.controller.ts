import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { PatchItemDto } from './dto/patch-item.dto';

@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(
    @Headers('Store-Id') storeId: string,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemService.create(storeId, createItemDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  patch(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateItemDto: PatchItemDto,
  ) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.itemService.remove(+id);
  }
}
