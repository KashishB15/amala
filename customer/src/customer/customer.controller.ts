import { Controller, Post, Request, Body, UseGuards, Response, Get, Req,Res } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { loginCustomerDto } from './dto/login-customer.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { OTPDto } from './dto/otp.dto';
import { verifyOtpDto } from './dto/verify-otp.dto';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/login')
  @UseGuards(AuthGuard("local"))
  async login(@Req() req: Request, @Res() res: Response, @Body() loginCustomerDto : loginCustomerDto) {
    return this.customerService.login(req, res);
  }

 
  @Get("/facebook")
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin() {}

  @Get("/facebook/redirect")
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req: Request, @Res() res: Response) {
    return this.customerService.socialLogin(req, res);
  }

  @Get('/google')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return this.customerService.socialLogin(req, res)
  }

  @MessagePattern('createCustomer')
  @Post('/create-customer')
  create(@Payload() createCustomerDto: CreateCustomerDto , @Res() res: Response) {
    return this.customerService.createCustomer(createCustomerDto, res);
  }

  @Post('/send-otp')
  async sendOtp(@Payload() otpDto: OTPDto): Promise<{ message: string }> {
    try {
      await this.customerService.sendOtp(otpDto.phone);
      return { message: 'OTP sent successfully' };
    } catch (error) {
      return { message: 'Failed to send OTP' };
    }
  }

  @Post('/verify-otp')
  async verifyOtp(@Payload()  otpDto:verifyOtpDto ) : Promise<string> {
    try {
      return this.customerService.verifyOtp(otpDto.phone,otpDto.otp);
    } catch (error) {
      return 'Failed to verify OTP';
    }
  }
}
