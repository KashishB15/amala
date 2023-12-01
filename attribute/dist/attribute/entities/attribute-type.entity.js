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
exports.AttributeType = void 0;
const typeorm_1 = require("typeorm");
const attribute_entity_1 = require("./attribute.entity");
let AttributeType = class AttributeType {
};
exports.AttributeType = AttributeType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AttributeType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AttributeType.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AttributeType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attribute_entity_1.Attribute, attribute => attribute.attribute_type),
    __metadata("design:type", attribute_entity_1.Attribute)
], AttributeType.prototype, "attribute", void 0);
exports.AttributeType = AttributeType = __decorate([
    (0, typeorm_1.Entity)()
], AttributeType);
//# sourceMappingURL=attribute-type.entity.js.map