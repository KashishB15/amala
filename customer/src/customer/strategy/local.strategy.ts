import { ExtractJwt } from 'passport-jwt';
import {  Strategy } from 'passport-local';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { constants } from '../../constants'
import { compareSync } from 'bcryptjs';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class passportLocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly customerService: CustomerService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: constants.JWT_SECRET_KEY,
        usernameField: 'email',
      });
    }
  
  async validate(email: string, password: string) {
    const customer = await this.customerService.getCustomerByEmailOrPhone(email);
    if (!customer) {
      throw new HttpException(
        `Customer not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    const passwordIsValid = compareSync(password, customer.password)
    if (!passwordIsValid) {
      throw new HttpException(
        `Invalid Password!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return customer;
  }
}
