import { OTPDto } from './otp.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class verifyOtpDto extends OTPDto {
    @IsString()
    @ApiProperty()
    otp: string;
}
