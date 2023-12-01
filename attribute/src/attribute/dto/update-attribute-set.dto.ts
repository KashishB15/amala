import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateAttributeSetDto } from './create-attribute-set.dto';

export class UpdateAttributeSetDto extends PartialType(CreateAttributeSetDto) {
  @IsNumber()
  id: number
}