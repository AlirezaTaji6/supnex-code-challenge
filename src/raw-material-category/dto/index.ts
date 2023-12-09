import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRawMaterialCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateRawMaterialCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class RawMaterialCategoryResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(init: Partial<RawMaterialCategoryResponse>) {
    this.id = init.id;
    this.name = init.name;
  }
}
