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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const twilio_service_1 = require("./twilio/twilio.service");
let CustomerService = class CustomerService {
    constructor(customerRepository, jwtService, twilioService) {
        this.customerRepository = customerRepository;
        this.jwtService = jwtService;
        this.twilioService = twilioService;
    }
    async createCustomer(customer, res) {
        let existCustomer = await this.getCustomerByEmailOrPhone(customer.email, customer.phone);
        if (existCustomer) {
            return res.status(common_1.HttpStatus.FOUND).json({ message: 'Customer already exist.' });
        }
        ;
        let password = customer.password;
        if (!password)
            password = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8);
        let hashedPassword = (0, bcryptjs_1.hashSync)(password, 8);
        customer.password = hashedPassword;
        customer.email = customer.email.toLowerCase();
        const newCustomer = this.customerRepository.create(customer);
        return await this.customerRepository.save(newCustomer);
    }
    async getCustomerByEmailOrPhone(email, phone) {
        let filter = [];
        if (phone)
            filter.push({ phone: phone });
        filter.push({ email: email.toLowerCase() });
        const user = this.customerRepository.findOne({ where: filter });
        if (user) {
            return user;
        }
        return null;
    }
    async login(req, res) {
        if (!req.user) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Customer not found!' });
        }
        const payload = { email: req.user.email, id: req.user.id };
        return res.status(common_1.HttpStatus.OK).json({ access_token: this.jwtService.sign(payload) });
    }
    socialLogin(req, res) {
        if (!req.user) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Customer not found!' });
        }
        return res.status(common_1.HttpStatus.OK).json({ message: 'User information', user: req.user });
    }
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async sendOtp(phoneNumber) {
        const otp = this.generateOtp();
        const message = `Your OTP is: ${otp}`;
        try {
            await this.twilioService.sendSms(phoneNumber, message);
            console.log(`OTP sent successfully to ${phoneNumber}`);
        }
        catch (error) {
            console.error(`Error sending OTP: ${error.message}`);
            throw error;
        }
    }
    async verifyOtp(phoneNumber, code) {
        try {
            return await this.twilioService.verifyOtp(phoneNumber, code);
        }
        catch (error) {
            console.error(`Error verify OTP: ${error.message}`);
            return error.message;
        }
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        twilio_service_1.TwilioService])
], CustomerService);
//# sourceMappingURL=customer.service.js.map