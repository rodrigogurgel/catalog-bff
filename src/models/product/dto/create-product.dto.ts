import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsUrl } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  @IsUrl()
  image?: string;
}
