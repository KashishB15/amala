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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const customer_service_1 = require("./customer.service");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const login_customer_dto_1 = require("./dto/login-customer.dto");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const otp_dto_1 = require("./dto/otp.dto");
const verify_otp_dto_1 = require("./dto/verify-otp.dto");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async login(req, res, loginCustomerDto) {
        return this.customerService.login(req, res);
    }
    async facebookLogin() { }
    async facebookLoginRedirect(req, res) {
        return this.customerService.socialLogin(req, res);
    }
    googleAuthRedirect(req, res) {
        return this.customerService.socialLogin(req, res);
    }
    create(createCustomerDto, res) {
        return this.customerService.createCustomer(createCustomerDto, res);
    }
    async sendOtp(otpDto) {
        try {
            await this.customerService.sendOtp(otpDto.phone);
            return { message: 'OTP sent successfully' };
        }
        catch (error) {
            return { message: 'Failed to send OTP' };
        }
    }
    async verifyOtp(otpDto) {
        try {
            return this.customerService.verifyOtp(otpDto.phone, otpDto.otp);
        }
        catch (error) {
            return 'Failed to verify OTP';
        }
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("local")),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, login_customer_dto_1.loginCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("/facebook"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("facebook")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "facebookLogin", null);
__decorate([
    (0, common_1.Get)("/facebook/redirect"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("facebook")),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "facebookLoginRedirect", null);
__decorate([
    (0, common_1.Get)('/google'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, microservices_1.MessagePattern)('createCustomer'),
    (0, common_1.Post)('/create-customer'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto, Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/send-otp'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.OTPDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "sendOtp", null);
__decorate([
    (0, common_1.Post)('/verify-otp'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_otp_dto_1.verifyOtpDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "verifyOtp", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map