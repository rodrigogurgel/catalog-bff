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

export class CreateItemOptionDto {
  @ApiProperty({ example: uuidv4() })
  @IsNotEmpty()
  @IsUUID('4')
  optionId: string;

  @ApiProperty({ type: CreateItemProductDto, required: true })
  product: CreateItemProductDto;

  @Min(0)
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  minPermitted: number;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  maxPermitted: number;

  @ApiProperty({ enum: StatusEnumDto })
  @IsNotEmpty()
  @IsEnum(StatusEnumDto)
  status: StatusEnumDto;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  index: number;

  @ApiProperty({
    type: [CreateItemCustomizationDto],
    required: false,
    default: [],
  })
  customizations: CreateItemCustomizationDto[];
}
