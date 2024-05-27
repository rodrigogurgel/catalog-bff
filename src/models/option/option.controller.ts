import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  create(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() createOptionDto: CreateOptionDto,
  ) {
    return this.optionService.create(createOptionDto);
  }

  @Put(':id')
  update(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return this.optionService.update(+id, updateOptionDto);
  }

  @Patch(':id')
  patch(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return this.optionService.update(+id, updateOptionDto);
  }

  @Delete(':id')
  remove(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.optionService.remove(+id);
  }
}
