import {
    IsNumber,
    IsString,
    IsOptional
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  

export class CreateAttributeOptionDto {
    
    @IsNumber()
    @ApiProperty()
    @IsOptional()
    position: number;

    @IsString()
    @ApiProperty()
    name: string;

    @IsNumber()
    @ApiProperty({default:1})
    attribute_id: number;
}