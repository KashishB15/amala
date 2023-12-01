"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeModule = void 0;
const common_1 = require("@nestjs/common");
const attribute_service_1 = require("./attribute.service");
const attribute_controller_1 = require("./attribute.controller");
const typeorm_1 = require("@nestjs/typeorm");
const attribute_entity_1 = require("./entities/attribute.entity");
const microservices_1 = require("@nestjs/microservices");
const attribute_set_entity_1 = require("./entities/attribute_set.entity");
const assigned_attribute_entity_1 = require("./entities/assigned-attribute.entity");
const attribute_type_entity_1 = require("./entities/attribute-type.entity");
const attribute_option_entity_1 = require("./entities/attribute-option.entity");
let AttributeModule = class AttributeModule {
};
exports.AttributeModule = AttributeModule;
exports.AttributeModule = AttributeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([attribute_entity_1.Attribute]),
            typeorm_1.TypeOrmModule.forFeature([attribute_set_entity_1.AttributeSet]),
            typeorm_1.TypeOrmModule.forFeature([assigned_attribute_entity_1.AssignedAttribute]),
            typeorm_1.TypeOrmModule.forFeature([attribute_type_entity_1.AttributeType]),
            typeorm_1.TypeOrmModule.forFeature([attribute_option_entity_1.AttributeOption]),
            microservices_1.ClientsModule.register([
                {
                    name: 'CUSTOMER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 3001,
                    },
                },
            ])],
        controllers: [attribute_controller_1.AttributeController],
        providers: [attribute_service_1.AttributeService],
    })
], AttributeModule);
//# sourceMappingURL=attribute.module.js.map