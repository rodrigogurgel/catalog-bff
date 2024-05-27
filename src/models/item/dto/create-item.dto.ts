import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  Min,
} from 'class-validator';
import { StatusEnumDto } from 'src/models/commom/dto/status.dto';
import { CreateItemProductDto } from './create-item-product.dto';
import { CreateItemCustomizationDto } from './create-item-customization.dto';
import { v4 as uuidv4 } from 'uuid';

export class CreateItemDto {
  @ApiProperty({ example: uuidv4() })
  @IsNotEmpty()
  @IsUUID('4')
  itemId: string;

  @ApiProperty({ example: uuidv4() })
  @IsNotEmpty()
  @IsUUID('4')
  categoryId: string;

  @ApiProperty({ type: CreateItemProductDto })
  product: CreateItemProductDto;

  @Min(0)
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsNotEmpty()
  @IsEnum(StatusEnumDto)
  @ApiProperty({ enum: StatusEnumDto })
  status: StatusEnumDto;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  index: number;

  @ApiProperty({ type: [CreateItemCustomizationDto], required: false })
  customizations: CreateItemCustomizationDto[];
}
