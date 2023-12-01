import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
  

export class CreateAttributeDto {
    @IsNotEmpty()
    @IsString({ message: 'name must be a text' })
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString({ message: 'identifier must be a text' })
    @ApiProperty()
    identifier: string;

    @IsNumber()
    @ApiProperty()
    is_default: number;

    @IsNumber()
    @ApiProperty()
    is_required: number;
    
    @IsNumber()
    @ApiProperty()
    @IsOptional()
    include_in_filters: number;
        
    @IsNumber()
    @ApiProperty()
    @IsOptional()
    show_on_pdp: number;

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    is_primary: number;

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    show_on_frontend: number;

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    use_in_search: number;

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    use_for_product: number;

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    use_for_collection: number;

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    use_for_order: number;
        
    @IsNumber()
    @ApiProperty()
    @IsOptional()
    position: number;
        
    @IsNumber()
    @ApiProperty({default:1})
    @IsOptional()
    attribute_type_id: number;
      
}
