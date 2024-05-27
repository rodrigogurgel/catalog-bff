import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsUUID, IsUrl } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class CreateItemProductDto {
  @ApiProperty({ example: uuidv4() })
  @IsNotEmpty()
  @IsUUID('4')
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  @IsUrl()
  image?: string;

  @ApiProperty({ required: true })
  @IsBoolean()
  create: boolean;
}
