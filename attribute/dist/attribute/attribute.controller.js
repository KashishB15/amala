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
exports.AttributeController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const attribute_service_1 = require("./attribute.service");
const create_attribute_dto_1 = require("./dto/create-attribute.dto");
const update_attribute_dto_1 = require("./dto/update-attribute.dto");
const create_attribute_set_dto_1 = require("./dto/create-attribute-set.dto");
const create_attribute_type_dto_1 = require("./dto/create-attribute-type.dto");
const create_attribute_option_dto_1 = require("./dto/create-attribute-option.dto");
const swagger_1 = require("@nestjs/swagger");
const update_attribute_set_dto_1 = require("./dto/update-attribute-set.dto");
let AttributeController = class AttributeController {
    constructor(attributeService) {
        this.attributeService = attributeService;
    }
    createAttribute(createAttributeDto, res) {
        return this.attributeService.createAttribute(createAttributeDto, res);
    }
    getAttribute(req, res, searchFilter, sortKey, sortValue, page, limit) {
        return this.attributeService.getAttributeList({ searchFilter, sortKey, sortValue, page, limit }, res);
    }
    createAttributeSet(createAttributeSetDto, res) {
        return this.attributeService.createAttributeSet(createAttributeSetDto, res);
    }
    getAttributeSet(req, res, searchFilter, sort) {
        return this.attributeService.getAttributeSetList({ searchFilter, sort }, res);
    }
    createAttributeType(createAttributeTypeDto, res) {
        return this.attributeService.createAttributeType(createAttributeTypeDto, res);
    }
    getAttributeTypes(res) {
        return this.attributeService.getAttributeTypes(res);
    }
    createAttributeOption(createAttributeOptionDto, res) {
        return this.attributeService.createAttributeOption(createAttributeOptionDto, res);
    }
    getAttributeOptions(res, attribute_id) {
        return this.attributeService.getAttributeOptions(attribute_id, res);
    }
    getAttributeOptionsForMultiAttributes(res, attribute_ids) {
        return this.attributeService.getAttributeOptionsForAttributeIds(attribute_ids, res);
    }
    assignAttributeSet(attribute_ids, attribute_set_id, position, res) {
        return this.attributeService.assignAttribute(attribute_ids, attribute_set_id, position, res);
    }
    unassignAttributeSet(attribute_ids, attribute_set_id, res) {
        return this.attributeService.unassignAttribute(attribute_ids, attribute_set_id, res);
    }
    updateAttribute(updateAttributeDto, res) {
        return this.attributeService.updateAttribute(updateAttributeDto, res);
    }
    updateAttributeSet(updateAttributeSetDto, res) {
        return this.attributeService.updateAttributeSet(updateAttributeSetDto, res);
    }
    deleteAttribute(id, res) {
        return this.attributeService.deleteAttribute(id, res);
    }
    deleteAttributeSet(id, res) {
        return this.attributeService.deleteAttributeSet(id, res);
    }
    getAllAssignAttribute(attribute_set_id, res) {
        return this.attributeService.getAllAssignedAttributeByAttributeSet(attribute_set_id, res);
    }
    getAllUnassignedAttribute(attribute_set_id, res) {
        return this.attributeService.getAllUnassignedAttribute(attribute_set_id, res);
    }
};
exports.AttributeController = AttributeController;
__decorate([
    (0, microservices_1.MessagePattern)('createAttribute'),
    (0, common_1.Post)('/create-attribute'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_dto_1.CreateAttributeDto, Response]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "createAttribute", null);
__decorate([
    (0, microservices_1.MessagePattern)('getAttribute'),
    (0, common_1.Get)('/get-attribute-list'),
    (0, swagger_1.ApiQuery)({ name: 'searchFilter', required: false, type: String, description: "name" }),
    (0, swagger_1.ApiQuery)({ name: 'sortKey', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'sortValue', required: false, type: String, enum: ["asc", "desc"] }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: "Page number (optional, default is 1)" }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: "Number of attributes per page (optional, default is 10)" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('searchFilter')),
    __param(3, (0, common_1.Query)('sortKey')),
    __param(4, (0, common_1.Query)('sortValue')),
    __param(5, (0, common_1.Query)('page')),
    __param(6, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Response, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "getAttribute", null);
__decorate([
    (0, microservices_1.MessagePattern)('createAttributeSet'),
    (0, common_1.Post)('/create-attribute-set'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_set_dto_1.CreateAttributeSetDto, Response]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "createAttributeSet", null);
__decorate([
    (0, microservices_1.MessagePattern)('getAttributeSet'),
    (0, common_1.Get)('/get-attribute-set'),
    (0, swagger_1.ApiQuery)({ name: 'searchFilter', required: false, type: String, description: "name" }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, type: String, enum: ["asc", "desc"] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('searchFilter')),
    __param(3, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Response, String, String]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "getAttributeSet", null);
__decorate([
    (0, microservices_1.MessagePattern)('createAttributeType'),
    (0, common_1.Post)('/create-attribute-type'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_type_dto_1.CreateAttributeTypeDto, Response]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "createAttributeType", null);
__decorate([
    (0, microservices_1.MessagePattern)('getAttributeTypes'),
    (0, common_1.Get)('/get-attribute-type-list'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "getAttributeTypes", null);
__decorate([
    (0, microservices_1.MessagePattern)('createAttributeOption'),
    (0, common_1.Post)('/create-attribute-option'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_option_dto_1.CreateAttributeOptionDto, Response]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "createAttributeOption", null);
__decorate([
    (0, microservices_1.MessagePattern)('getAttributeOptions'),
    (0, common_1.Get)('/get-attribute-option-list'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('attribute_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, Number]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "getAttributeOptions", null);
__decorate([
    (0, common_1.Get)('/get-attribute-option-list-for-multi-attributeids'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('attribute_ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, Array]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "getAttributeOptionsForMultiAttributes", null);
__decorate([
    (0, microservices_1.MessagePattern)('assignAttribute'),
    (0, common_1.Post)('/assign-attribute'),
    (0, swagger_1.ApiBody)({ schema: {
            properties: {
                'attribute_ids': { type: 'array', example: [1, 2, 3, 4] },
                'attribute_set_id': { type: 'number', example: 1 },
                'position': { type: 'number' }
            }
        } }),
    __param(0, (0, common_1.Body)('attribute_ids')),
    __param(1, (0, common_1.Body)('attribute_set_id')),
    __param(2, (0, common_1.Body)('position')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Number, Response]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "assignAttributeSet", null);
__decorate([
    (0, microservices_1.MessagePattern)('unassignAttribute'),
    (0, common_1.Post)('/unassign-attribute'),
    (0, swagger_1.ApiBody)({ schema: {
            properties: {
                'attribute_ids': { type: 'array', example: [1, 2, 3, 4] },
                'attribute_set_id': { type: 'number', example: 1 }
            }
        } }),
    __param(0, (0, common_1.Body)('attribute_ids')),
    __param(1, (0, common_1.Body)('attribute_set_id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Response]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "unassignAttributeSet", null);
__decorate([
    (0, microservices_1.MessagePattern)('updateAttribute'),
    (0, common_1.Post)('/update-attribute'),
    (0, swagger_1.ApiBody)({ schema: {
            properties: {
                'identifier': { type: 'string' }
            }
        } }),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_attribute_dto_1.UpdateAttributeDto, Response]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "updateAttribute", null);
__decorate([
    (0, microservices_1.MessagePattern)('updateAttributeSet'),
    (0, common_1.Post)('/update-attribute-set'),
    (0, swagger_1.ApiBody)({ schema: {
            properties: {
                'id': { type: 'number' }
            }
        } }),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_attribute_set_dto_1.UpdateAttributeSetDto, Response]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "updateAttributeSet", null);
__decorate([
    (0, common_1.Delete)('/delete-attribute:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Response]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "deleteAttribute", null);
__decorate([
    (0, common_1.Delete)('/delete-attribute-set:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Response]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "deleteAttributeSet", null);
__decorate([
    (0, microservices_1.MessagePattern)('getAllAssignAttribute'),
    (0, common_1.Get)('/get-all-assign-attribute'),
    __param(0, (0, common_1.Query)('attribute_set_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Response]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "getAllAssignAttribute", null);
__decorate([
    (0, microservices_1.MessagePattern)('getAllUnassignedAttribute'),
    (0, common_1.Get)('/get-all-unassign-attribute'),
    __param(0, (0, common_1.Query)('attribute_set_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Response]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "getAllUnassignedAttribute", null);
exports.AttributeController = AttributeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [attribute_service_1.AttributeService])
], AttributeController);
//# sourceMappingURL=attribute.controller.js.map