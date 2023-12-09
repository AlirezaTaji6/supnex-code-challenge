import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateSupplierDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class SupplierResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(init: Partial<SupplierResponse>) {
    this.id = init.id;
    this.name = init.name;
  }
}
