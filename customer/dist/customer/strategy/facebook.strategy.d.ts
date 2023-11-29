import { Profile, Strategy } from "passport-facebook";
import { CustomerService } from "src/customer/customer.service";
declare const FacebookStrategy_base: new (...args: any[]) => Strategy;
export declare class FacebookStrategy extends FacebookStrategy_base {
    private readonly customerService;
    constructor(customerService: CustomerService);
    validate(accessToken: string, profile: Profile, done: (err: any, user: any, info?: any) => void): Promise<any>;
}
export {};
