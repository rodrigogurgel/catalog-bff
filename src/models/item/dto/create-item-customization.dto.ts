import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';
import { StatusEnumDto } from 'src/models/commom/dto/status.dto';
import { CreateItemOptionDto } from './create-item-option.dto';
import { v4 as uuidv4 } from 'uuid';

export class CreateItemCustomizationDto {
  @ApiProperty({ example: uuidv4() })
  @IsNotEmpty()
  @IsUUID('4')
  customizationId: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description?: string;

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

  @ApiProperty({ type: [CreateItemOptionDto], required: false })
  options: CreateItemOptionDto[];
}
