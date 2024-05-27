import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { StatusEnumDto } from '../../commom/dto/status.dto';

export class PatchCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

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
