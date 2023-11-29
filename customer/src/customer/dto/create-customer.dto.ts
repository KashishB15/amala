import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsEmail,
    isString
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString({ message: 'firstname must be a text' })
    @ApiProperty()
    firstName: string;
  
    @IsNotEmpty()
    @IsString({ message: 'lastname must be a text' })
    @ApiProperty()
    lastName: string;


    @IsNumber()
    @ApiProperty()
    phone: number;
  
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;

  }
