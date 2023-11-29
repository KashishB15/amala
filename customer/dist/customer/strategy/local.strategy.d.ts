import { Strategy } from 'passport-local';
import { CustomerService } from 'src/customer/customer.service';
declare const passportLocalStrategy_base: new (...args: any[]) => Strategy;
export declare class passportLocalStrategy extends passportLocalStrategy_base {
    private readonly customerService;
    constructor(customerService: CustomerService);
    validate(email: string, password: string): Promise<any>;
}
export {};
