import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { loginCustomerDto } from './dto/login-customer.dto';
import { OTPDto } from './dto/otp.dto';
import { verifyOtpDto } from './dto/verify-otp.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    login(req: Request, res: Response, loginCustomerDto: loginCustomerDto): Promise<any>;
    facebookLogin(): Promise<void>;
    facebookLoginRedirect(req: Request, res: Response): Promise<any>;
    googleAuthRedirect(req: Request, res: Response): any;
    create(createCustomerDto: CreateCustomerDto, res: Response): Promise<import("./entities/customer.entity").Customer>;
    sendOtp(otpDto: OTPDto): Promise<{
        message: string;
    }>;
    verifyOtp(otpDto: verifyOtpDto): Promise<string>;
}
