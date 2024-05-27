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
} from '@nestjs/common';
import { CustomizationService } from './customization.service';
import { CreateCustomizationDto } from './dto/create-customization.dto';
import { UpdateCustomizationDto } from './dto/update-customization.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('customizations')
@Controller('customizations')
export class CustomizationController {
  constructor(private readonly customizationService: CustomizationService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() createCustomizationDto: CreateCustomizationDto) {
    return this.customizationService.create(createCustomizationDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateCustomizationDto: UpdateCustomizationDto,
  ) {
    return this.customizationService.update(+id, updateCustomizationDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  patch(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateCustomizationDto: UpdateCustomizationDto,
  ) {
    return this.customizationService.update(+id, updateCustomizationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  remove(
    @Headers('Store-Id') storeId: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.customizationService.remove(+id);
  }
}
