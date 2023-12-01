import {
    IsNumber,
    IsString,
    IsOptional
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  

export class CreateAttributeTypeDto {
    
    @IsNumber()
    @ApiProperty()
    @IsOptional()
    position: number;

    @IsString()
    @ApiProperty()
    name: string;
}