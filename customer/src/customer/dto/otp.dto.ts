import {
    IsNumber, IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class OTPDto {
    @IsString()
    @ApiProperty()
    phone: string;
  }
