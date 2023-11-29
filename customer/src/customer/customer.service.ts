import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { JwtService } from '@nestjs/jwt';
import { hashSync} from 'bcryptjs'
import { TwilioService } from './twilio/twilio.service';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    private readonly jwtService: JwtService,
    private readonly twilioService: TwilioService
  ) {}
  
  async createCustomer(customer: CreateCustomerDto, res: any): Promise<Customer> {
    let existCustomer = await this.getCustomerByEmailOrPhone(customer.email, customer.phone)
    if (existCustomer) {
      return res.status(HttpStatus.FOUND).json({ message: 'Customer already exist.' });
    };
    let password = customer.password
    if (!password) password = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0,8)
    let hashedPassword = hashSync(password, 8)
    customer.password = hashedPassword
    customer.email = customer.email.toLowerCase()
    const newCustomer = this.customerRepository.create(customer);
    return await this.customerRepository.save(newCustomer);
  }
  async getCustomerByEmailOrPhone(email: string, phone?: number): Promise<any> {
    let filter = [];
    if (phone) filter.push({phone:phone})
    filter.push({email: email.toLowerCase()})
    const user = this.customerRepository.findOne({ where: filter});
    if (user) {
      return user;
    }
    return null;
  }
  async login(req: any, res: any) {
    if (!req.user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Customer not found!' });
    }
    
    const payload = { email: req.user.email, id: req.user.id};
    return res.status(HttpStatus.OK).json({access_token: this.jwtService.sign(payload)});
  }

  socialLogin(req: any, res: any) {
    if (!req.user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Customer not found!' });
    }
    return res.status(HttpStatus.OK).json({message: 'User information',user: req.user });
  }

  generateOtp(): string {
    // Generate a random 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOtp(phoneNumber: string): Promise<void> {
    const otp = this.generateOtp();
    const message = `Your OTP is: ${otp}`;

    try {
      await this.twilioService.sendSms(phoneNumber, message);
      console.log(`OTP sent successfully to ${phoneNumber}`);
    } catch (error) {
      console.error(`Error sending OTP: ${error.message}`);
      throw error;
    }
  }
  
  async verifyOtp(phoneNumber: string, code:string): Promise<string> {
    try {
      return await this.twilioService.verifyOtp(phoneNumber, code);
    } catch (error) {
      console.error(`Error verify OTP: ${error.message}`);
      return error.message;
    }
  }
}
