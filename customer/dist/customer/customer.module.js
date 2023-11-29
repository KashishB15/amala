"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModule = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("./customer.service");
const customer_controller_1 = require("./customer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const microservices_1 = require("@nestjs/microservices");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../constants");
const facebook_strategy_1 = require("./strategy/facebook.strategy");
const google_strategy_1 = require("./strategy/google.strategy");
const local_strategy_1 = require("./strategy/local.strategy");
const twilio_service_1 = require("./twilio/twilio.service");
let CustomerModule = class CustomerModule {
};
exports.CustomerModule = CustomerModule;
exports.CustomerModule = CustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([customer_entity_1.Customer]),
            microservices_1.ClientsModule.register([
                {
                    name: 'CUSTOMER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 7000,
                    },
                },
            ]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.constants.JWT_SECRET_KEY,
                signOptions: { expiresIn: '35d' },
            }), passport_1.PassportModule],
        controllers: [customer_controller_1.CustomerController],
        providers: [customer_service_1.CustomerService, local_strategy_1.passportLocalStrategy, google_strategy_1.GoogleStrategy, facebook_strategy_1.FacebookStrategy, twilio_service_1.TwilioService],
    })
], CustomerModule);
//# sourceMappingURL=customer.module.js.map