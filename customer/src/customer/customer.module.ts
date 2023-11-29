import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { constants } from '../constants';
import { FacebookStrategy } from 'src/customer/strategy/facebook.strategy';
import { GoogleStrategy } from 'src/customer/strategy/google.strategy';
import { passportLocalStrategy } from 'src/customer/strategy/local.strategy';
import { TwilioService } from './twilio/twilio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]),
  ClientsModule.register([
    {
      name: 'CUSTOMER_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 7000,
      },
    },
  ]),
  PassportModule,
  JwtModule.register({
    secret: constants.JWT_SECRET_KEY,
    signOptions: { expiresIn: '35d' },
  }),PassportModule],
  controllers: [CustomerController],
  providers: [CustomerService, passportLocalStrategy, GoogleStrategy, FacebookStrategy, TwilioService],
})
export class CustomerModule {}
