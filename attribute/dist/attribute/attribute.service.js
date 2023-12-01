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
exports.AttributeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attribute_entity_1 = require("./entities/attribute.entity");
const attribute_set_entity_1 = require("./entities/attribute_set.entity");
const assigned_attribute_entity_1 = require("./entities/assigned-attribute.entity");
const attribute_type_entity_1 = require("./entities/attribute-type.entity");
const attribute_option_entity_1 = require("./entities/attribute-option.entity");
let AttributeService = class AttributeService {
    constructor(attributeRepository, attributeSetRepository, assignedAttributeRepository, attributeTypeRepository, attributeOptionRepository) {
        this.attributeRepository = attributeRepository;
        this.attributeSetRepository = attributeSetRepository;
        this.assignedAttributeRepository = assignedAttributeRepository;
        this.attributeTypeRepository = attributeTypeRepository;
        this.attributeOptionRepository = attributeOptionRepository;
    }
    async createAttribute(attributeInfo, res) {
        try {
            let existAttribute = await this.getSingleAttribute({ identifier: attributeInfo.identifier });
            if (existAttribute) {
                return res.status(common_1.HttpStatus.FOUND).json({ message: 'attribute already exist.' });
            }
            if (!attributeInfo.position && attributeInfo.position !== 0) {
                attributeInfo.position = await this.getMaxPositionValue(this.attributeRepository, 'attribute');
            }
            let attribute_type = {};
            if (attributeInfo.attribute_type_id) {
                attribute_type = await this.attributeTypeRepository.findOne({ where: { id: attributeInfo.attribute_type_id } });
            }
            const newAttribute = this.attributeRepository.create({ ...attributeInfo, attribute_type });
            let data = await this.attributeRepository.save(newAttribute);
            return res.status(common_1.HttpStatus.OK).json({ data, message: 'Successfully created attribute' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
    async createAttributeType(attributeType, res) {
        try {
            let existAttributeType = await this.getAttributeTypeByName(attributeType.name);
            if (existAttributeType) {
                return res.status(common_1.HttpStatus.FOUND).json({ message: 'attribute type already exist.' });
            }
            if (!attributeType.position && attributeType.position !== 0) {
                attributeType.position = await this.getMaxPositionValue(this.attributeTypeRepository, 'attribute_type');
            }
            const newAttributeType = this.attributeTypeRepository.create(attributeType);
            let data = await this.attributeTypeRepository.save(newAttributeType);
            return res.status(common_1.HttpStatus.OK).json({ data, message: 'Successfully created attribute type' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
    async getAttributeTypes(res) {
        try {
            let attributeTypeList = await this.attributeTypeRepository.find({ select: { name: true }, order: { position: 'ASC' } });
            let data = attributeTypeList.map(x => x.name);
            return res.status(common_1.HttpStatus.OK).json({ data, message: 'Successfully fetch all attribute types' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
    async getAttributeOptions(attribute_id, res) {
        try {
            let attributeOptionList = await this.attributeOptionRepository.find({ where: { attribute_id }, select: { name: true }, order: { position: 'ASC' } });
            let data = attributeOptionList.map(x => x.name);
            return res.status(common_1.HttpStatus.OK).json({ data, message: 'Successfully fetch all attribute options' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
    async getAttributeOptionsForAttributeIds(attribute_ids, res) {
        try {
            let attributeOptionList = await this.attributeOptionRepository.find({ where: { attribute_id: (0, typeorm_2.In)(attribute_ids) }, order: { position: 'ASC' } });
            return res.status(common_1.HttpStatus.OK).json({ data: { ...attributeOptionList }, message: 'Successfully fetch all attribute options' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
    async createAttributeSet(attributeSet, res) {
        let existAttribute = await this.getAttributeSetByName(attributeSet.name);
        if (existAttribute) {
            return res.status(common_1.HttpStatus.FOUND).json({ message: 'attribute set already exist.' });
        }
        const newAttribute = this.attributeSetRepository.create(attributeSet);
        let data = await this.attributeSetRepository.save(newAttribute);
        return res.status(common_1.HttpStatus.OK).json({ data, message: 'Successfully created attribute set' });
    }
    async assignAttribute(attribute_ids, attribute_set_id, position, res) {
        for (let i = 0; i < attribute_ids.length; i++) {
            const attribute_id = attribute_ids[i];
            let existAssignedAttribute = await this.getAssignedAttribute(attribute_id, attribute_set_id);
            if (!existAssignedAttribute) {
                if (!position && position !== 0) {
                    position = await this.getMaxPositionValue(this.assignedAttributeRepository, 'assigned_attribute');
                }
                const newAssignedAttribute = this.assignedAttributeRepository.create({ attribute_id, attribute_set_id, position });
                await this.assignedAttributeRepository.save(newAssignedAttribute);
            }
        }
        return res.status(common_1.HttpStatus.OK).json({ message: 'Successfully assigned attributes' });
    }
    async unassignAttribute(attribute_ids, attribute_set_id, res) {
        try {
            for (let i = 0; i < attribute_ids.length; i++) {
                const attribute_id = attribute_ids[i];
                let attribute = await this.getSingleAttribute({ id: attribute_id });
                await this.assignedAttributeRepository.delete({ attribute_id, attribute_set_id });
            }
            return res.status(common_1.HttpStatus.OK).json({ message: 'Successfully unassigned attributes' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
    async getSingleAttribute(filter) {
        return await this.attributeRepository.findOne({ where: { ...filter, is_deleted: false } });
    }
    async getAttributeTypeByName(name) {
        return await this.attributeTypeRepository.findOne({ where: { name } });
    }
    async getAttributeSetByName(name) {
        return await this.attributeRepository.findOne({ where: { name, is_deleted: false } });
    }
    async getAssignedAttribute(attribute_id, attribute_set_id) {
        let attribute = await this.getSingleAttribute({ id: attribute_id });
        return await this.assignedAttributeRepository.findOne({ where: { attribute_id, attribute_set_id } });
    }
    async getMaxPositionValue(repository, tableName) {
        let maxPosition = await repository.createQueryBuilder(tableName).select(`MAX(${tableName}.position)`, "max").getRawOne();
        return (maxPosition && (maxPosition.max || maxPosition.max === 0)) ? maxPosition.max + 1 : 0;
    }
    async getAllAssignedAttributeByAttributeSet(attribute_set_id, res) {
        try {
            let assignedAttributeList = (await this.assignedAttributeRepository.find({ where: { attribute_set_id }, order: { position: 'ASC' } })).map(x => x.attribute_id);
            let data = (await this.attributeRepository.find({ where: { id: (0, typeorm_2.In)(assignedAttributeList) } })).map(x => { return { id: x.id, name: x.name }; });
            return res.status(common_1.HttpStatus.OK).json({ data, message: 'Successfully fetch all assigned attribute list' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
    async getAllUnassignedAttribute(attribute_set_id, res) {
        try {
            let attributeIds = (await this.assignedAttributeRepository.find({ where: { attribute_set_id } })).map(x => x.attribute_id);
            let data = (await this.attributeRepository.find({ where: { is_deleted: false }, order: { position: 'ASC' } })).filter(x => !attributeIds.find(y => y == x.id)).map(x => { return { id: x.id, name: x.name }; });
            return res.status(common_1.HttpStatus.OK).json({ data, message: 'Successfully fetch all unassigned attribute list' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
    async updateAttribute(attribute, res) {
        try {
            let existAttribute = await this.getSingleAttribute({ identifier: attribute.identifier });
            if (!existAttribute) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: "attribute doesn't exist." });
            }
            let data = await this.attributeRepository.save({ ...existAttribute, ...attribute });
            return res.status(common_1.HttpStatus.OK).json({ data, message: 'Successfully updated attribute' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
    async updateAttributeSet(attributeSet, res) {
        let existAttributeSet = await this.attributeSetRepository.find({ where: { id: attributeSet.id, is_deleted: false } });
        if (!existAttributeSet) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: "attribute doesn't exist." });
        }
        let data = await this.attributeSetRepository.save(attributeSet);
        return res.status(common_1.HttpStatus.OK).json({ data, message: 'Successfully updated attribute set' });
    }
    async getAttributeList(attributeFilterInfo, res) {
        try {
            let sortQuery = {};
            if (attributeFilterInfo.sortKey && attributeFilterInfo.sortValue) {
                if ((attributeFilterInfo.sortValue == "asc" || attributeFilterInfo.sortValue == "desc")) {
                    sortQuery[attributeFilterInfo.sortKey] = attributeFilterInfo.sortValue == "desc" ? 'DESC' : 'ASC';
                }
            }
            else {
                sortQuery['position'] = (!attributeFilterInfo.sortValue) ? 'ASC' : attributeFilterInfo.sortValue;
            }
            const searchQuery = { is_deleted: false };
            if (attributeFilterInfo.searchFilter) {
                searchQuery['name'] = (0, typeorm_2.Like)(`%${attributeFilterInfo.searchFilter}%`);
            }
            const page = parseInt(attributeFilterInfo.page) || 1;
            const limit = parseInt(attributeFilterInfo.limit) || 10;
            const skip = (page - 1) * limit;
            const select = {
                id: true,
                name: true,
                identifier: true,
                is_default: true,
                is_required: true,
                include_in_filters: true,
                show_on_pdp: true,
                is_primary: true,
                show_on_frontend: true,
                use_in_search: true,
                use_for_product: true,
                use_for_collection: true,
                use_for_order: true,
                position: true,
                created_at: true,
                updated_at: true,
                attribute_type: { name: true, id: true }
            };
            const attributeRecord = await this.attributeRepository.findAndCount({ where: searchQuery, skip: skip, take: limit, order: sortQuery, relations: ['attribute_type'], select });
            const totalItems = attributeRecord[1];
            const totalPages = Math.ceil(totalItems / limit);
            const data = {
                paginatedResults: attributeRecord[0],
                totalPages,
                numberOfRows: attributeRecord[0].length,
                currentPage: page,
                limit: limit,
                totalRecords: totalItems
            };
            return res.status(common_1.HttpStatus.OK).json({ data, message: 'Successfully fetch attribute list' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
    async getAttributeSetList(attributeSetFilterInfo, res) {
        try {
            let sortQuery = {};
            if (attributeSetFilterInfo.sort) {
                if ((attributeSetFilterInfo.sort == "asc" || attributeSetFilterInfo.sort == "desc")) {
                    sortQuery['name'] = attributeSetFilterInfo.sort == "desc" ? 'DESC' : 'ASC';
                }
            }
            const searchQuery = { is_deleted: false };
            if (attributeSetFilterInfo.searchFilter) {
                searchQuery['name'] = (0, typeorm_2.Like)(`%${attributeSetFilterInfo.searchFilter}%`);
            }
            const data = await this.attributeSetRepository.find({ where: searchQuery, order: sortQuery });
            return res.status(common_1.HttpStatus.OK).json({ data, message: 'Successfully fetch attribute set list' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
    async deleteAttribute(id, res) {
        try {
            let existAttribute = await this.getSingleAttribute({ id });
            if (!existAttribute) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: "attribute doesn't exist." });
            }
            let deletedAttribute = await this.attributeRepository.save({ ...existAttribute, is_deleted: true });
            return res.status(common_1.HttpStatus.OK).json({ message: 'Successfully deleted attribute' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
    async createAttributeOption(attributeOption, res) {
        try {
            let existAttributeOption = await this.attributeOptionRepository.findOne({ where: { attribute_id: attributeOption.attribute_id, name: attributeOption.name } });
            if (existAttributeOption) {
                return res.status(common_1.HttpStatus.FOUND).json({ message: 'attribute option already exist.' });
            }
            if (!attributeOption.position && attributeOption.position !== 0) {
                attributeOption.position = await this.getMaxPositionValue(this.attributeOptionRepository, 'attribute_option');
            }
            const newAttributeOption = this.attributeOptionRepository.create(attributeOption);
            let data = await this.attributeOptionRepository.save(newAttributeOption);
            return res.status(common_1.HttpStatus.OK).json({ data, message: 'Successfully created attribute option' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
    async deleteAttributeSet(attributeSetId, res) {
        try {
            let existAttributeSet = await this.attributeSetRepository.findOne({ where: { id: attributeSetId, is_deleted: false } });
            if (!existAttributeSet) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: "attribute don't exist." });
            }
            let deletedAttribute = await this.attributeRepository.save({ ...existAttributeSet, is_deleted: true });
            if (deletedAttribute)
                return res.status(common_1.HttpStatus.OK).json({ message: 'Successfully deleted attribute set' });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
        }
    }
};
exports.AttributeService = AttributeService;
exports.AttributeService = AttributeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attribute_entity_1.Attribute)),
    __param(1, (0, typeorm_1.InjectRepository)(attribute_set_entity_1.AttributeSet)),
    __param(2, (0, typeorm_1.InjectRepository)(assigned_attribute_entity_1.AssignedAttribute)),
    __param(3, (0, typeorm_1.InjectRepository)(attribute_type_entity_1.AttributeType)),
    __param(4, (0, typeorm_1.InjectRepository)(attribute_option_entity_1.AttributeOption)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AttributeService);
//# sourceMappingURL=attribute.service.js.map