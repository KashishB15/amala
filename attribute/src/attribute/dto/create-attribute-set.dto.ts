import {
    IsNotEmpty,
    IsString
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  
export class CreateAttributeSetDto {
    @IsNotEmpty()
    @IsString({ message: 'name must be a text' })
    @ApiProperty()
    name: string;
}
