import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  Min,
} from 'class-validator';
import { StatusEnumDto } from '../../commom/dto/status.dto';
import { v4 as uuidv4 } from 'uuid';

export class CreateCategoryDto {
  @ApiProperty({ example: uuidv4() })
  @IsNotEmpty()
  @IsUUID('4')
  categoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(StatusEnumDto)
  @ApiProperty({ enum: StatusEnumDto })
  status: StatusEnumDto;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  index: number;
}
