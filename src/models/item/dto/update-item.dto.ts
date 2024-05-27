import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { StatusEnumDto } from 'src/models/commom/dto/status.dto';

export class UpdateItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsPositive()
  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  price: number;

  @IsNotEmpty()
  @IsEnum(StatusEnumDto)
  @ApiProperty({ enum: StatusEnumDto })
  status: StatusEnumDto;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  index: number;
}
