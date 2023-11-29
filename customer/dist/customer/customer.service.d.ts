import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { JwtService } from '@nestjs/jwt';
import { TwilioService } from './twilio/twilio.service';
export declare class CustomerService {
    private customerRepository;
    private readonly jwtService;
    private readonly twilioService;
    constructor(customerRepository: Repository<Customer>, jwtService: JwtService, twilioService: TwilioService);
    createCustomer(customer: CreateCustomerDto, res: any): Promise<Customer>;
    getCustomerByEmailOrPhone(email: string, phone?: number): Promise<any>;
    login(req: any, res: any): Promise<any>;
    socialLogin(req: any, res: any): any;
    generateOtp(): string;
    sendOtp(phoneNumber: string): Promise<void>;
    verifyOtp(phoneNumber: string, code: string): Promise<string>;
}
