// twilio.service.ts
import { Injectable } from '@nestjs/common';
import { constants } from 'src/constants';
import * as Twilio from 'twilio';

@Injectable()
export class TwilioService {
  private readonly twilioClient: Twilio.Twilio;

  constructor() {
    this.twilioClient =  Twilio(constants.TWILIO_ACCOUNT_SID, constants.TWILIO_AUTH_TOKEN);
  }

  async sendSms(to: string, body: string) {
    try {
      //   const message = await this.twilioClient.messages.create({
      //     body,
      //     to,
      //     from: constants..TWILIO_PHONE_NO,
      //   });

      let message = '';
      await this.twilioClient.verify.v2
        .services(constants.TWILIO_SERVICE_SID)
        .verifications.create({ to, channel: 'sms' })
        .then((verification) => (message = verification.status));
      return message;
    } catch (error) {
      console.error(`Error sending SMS: ${error.message}`);
      throw error;
    }
  }

  async verifyOtp(phoneNumber: string, code: string) {
    let msg = '';
    await this.twilioClient.verify.v2
      .services(constants.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phoneNumber, code: code })
      .then((verification) => (msg = verification.status));
    return msg;
  }
}
