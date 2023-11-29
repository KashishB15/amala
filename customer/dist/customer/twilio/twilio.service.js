"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants");
const Twilio = require("twilio");
let TwilioService = class TwilioService {
    constructor() {
        this.twilioClient = Twilio(constants_1.constants.TWILIO_ACCOUNT_SID, constants_1.constants.TWILIO_AUTH_TOKEN);
    }
    async sendSms(to, body) {
        try {
            let message = '';
            await this.twilioClient.verify.v2
                .services(constants_1.constants.TWILIO_SERVICE_SID)
                .verifications.create({ to, channel: 'sms' })
                .then((verification) => (message = verification.status));
            return message;
        }
        catch (error) {
            console.error(`Error sending SMS: ${error.message}`);
            throw error;
        }
    }
    async verifyOtp(phoneNumber, code) {
        let msg = '';
        await this.twilioClient.verify.v2
            .services(constants_1.constants.TWILIO_SERVICE_SID)
            .verificationChecks.create({ to: phoneNumber, code: code })
            .then((verification) => (msg = verification.status));
        return msg;
    }
};
exports.TwilioService = TwilioService;
exports.TwilioService = TwilioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TwilioService);
//# sourceMappingURL=twilio.service.js.map