import {
    IsNumber,
    IsOptional
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';  

export class AssignAttributeDto {
    
    @IsNumber()
    @ApiProperty()
    @IsOptional()
    position: number;
        
    @IsNumber()
    @ApiProperty({default:1})
    attribute_id: number;
    
    @IsNumber()
    @ApiProperty({default:1})
    attribute_set_id: number;
}