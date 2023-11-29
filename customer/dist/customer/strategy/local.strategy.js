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
exports.passportLocalStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const constants_1 = require("../../constants");
const bcryptjs_1 = require("bcryptjs");
const customer_service_1 = require("../customer.service");
let passportLocalStrategy = class passportLocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(customerService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants_1.constants.JWT_SECRET_KEY,
            usernameField: 'email',
        });
        this.customerService = customerService;
    }
    async validate(email, password) {
        const customer = await this.customerService.getCustomerByEmailOrPhone(email);
        if (!customer) {
            throw new common_1.HttpException(`Customer not found.`, common_1.HttpStatus.NOT_FOUND);
        }
        const passwordIsValid = (0, bcryptjs_1.compareSync)(password, customer.password);
        if (!passwordIsValid) {
            throw new common_1.HttpException(`Invalid Password!`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return customer;
    }
};
exports.passportLocalStrategy = passportLocalStrategy;
exports.passportLocalStrategy = passportLocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], passportLocalStrategy);
//# sourceMappingURL=local.strategy.js.map