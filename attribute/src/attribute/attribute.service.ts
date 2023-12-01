import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Attribute } from './entities/attribute.entity';
import { CreateAttributeSetDto } from './dto/create-attribute-set.dto';
import { AttributeSet } from './entities/attribute_set.entity';
import { AssignedAttribute } from './entities/assigned-attribute.entity';
import { CreateAttributeTypeDto } from './dto/create-attribute-type.dto';
import { AttributeType } from './entities/attribute-type.entity';
import { AttributeOption } from './entities/attribute-option.entity';
import { CreateAttributeOptionDto } from './dto/create-attribute-option.dto';
import { UpdateAttributeSetDto } from './dto/update-attribute-set.dto';


@Injectable()
export class AttributeService {

  constructor(
    @InjectRepository(Attribute) private attributeRepository: Repository<Attribute>,
    @InjectRepository(AttributeSet) private attributeSetRepository: Repository<AttributeSet>,
    @InjectRepository(AssignedAttribute) private assignedAttributeRepository: Repository<AssignedAttribute>,
    @InjectRepository(AttributeType) private attributeTypeRepository: Repository<AttributeType>,
    @InjectRepository(AttributeOption) private attributeOptionRepository: Repository<AttributeOption>
  ) { }

  async createAttribute(attributeInfo: CreateAttributeDto, attributeOptions: any, res: any) {
    try{
    let existAttribute = await this.checkAttributeExist({identifier:attributeInfo.identifier})
    if (existAttribute) {
      return res.status(HttpStatus.FOUND).json({ message: 'attribute already exist.' });
    }
    if(!attributeInfo.position && attributeInfo.position !== 0) {
      attributeInfo.position = await this.getMaxPositionValue(this.attributeRepository, 'attribute')
    }
    let attribute_type = {}
    if (attributeInfo.attribute_type_id) {
      attribute_type = await this.attributeTypeRepository.findOne({where:{id:attributeInfo.attribute_type_id}})
    }
    const newAttribute = this.attributeRepository.create({...attributeInfo, attribute_type });
    let data = await this.attributeRepository.save(newAttribute);
    if (attributeOptions && attributeOptions.length>0) {
      for (let i=0; i< attributeOptions.length; i++) {
        await this.createAttributeOption({...attributeOptions[i],attribute_id:data.id}, res)
      }
    }
    return res.status(HttpStatus.OK).json({ data, message: 'Successfully created attribute' })

  } catch (error) {
    console.log(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
  }
  }

  async createAttributeType(attributeType: CreateAttributeTypeDto, res: any) {
    try{
    let existAttributeType = await this.getAttributeTypeByName(attributeType.name)
    if (existAttributeType) {
      return res.status(HttpStatus.FOUND).json({ message: 'attribute type already exist.' });
    }
    if(!attributeType.position && attributeType.position !== 0) {
      attributeType.position = await this.getMaxPositionValue(this.attributeTypeRepository, 'attribute_type')
    }
    const newAttributeType = this.attributeTypeRepository.create(attributeType);
    let data = await this.attributeTypeRepository.save(newAttributeType);
    return res.status(HttpStatus.OK).json({ data, message: 'Successfully created attribute type' })

  } catch (error) {
    console.log(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
  }

  }

  async getAttributeTypes(res: any) {
    try {
      let attributeTypeList = await this.attributeTypeRepository.find({ select:{name:true}, order:{position:'ASC'}})
      let data = attributeTypeList.map(x=>x.name)
      return res.status(HttpStatus.OK).json({ data, message: 'Successfully fetch all attribute types' })
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
    }
  }

  async getSingleAttribute(id: number, res: any) {
    try {
      let attribute = await this.attributeRepository.findOne({where: {id, is_deleted:false}})
      if (!attribute) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "attribute doesn't exist." });
      }
      return res.status(HttpStatus.OK).json({ data: attribute, message: 'Successfully fetch attribute details' })
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
    }
  }

  async getAttributeOptions(attribute_id: number, res: any) {
    try {
      let attributeOptionList = await this.attributeOptionRepository.find({ where:{attribute_id},select:{name:true}, order:{position:'ASC'}})
      let data = attributeOptionList.map(x=>x.name)
      return res.status(HttpStatus.OK).json({ data, message: 'Successfully fetch all attribute options' })
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
    }
  }

  async getAttributeOptionsForAttributeIds(attribute_ids: number[], res: any) {
    try {
      let attributeOptionList = await this.attributeOptionRepository.find({ where:{attribute_id:In(attribute_ids)}, order:{position:'ASC'}})
      return res.status(HttpStatus.OK).json({ data: {...attributeOptionList}, message: 'Successfully fetch all attribute options' })
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
    }
  }


  async createAttributeSet(attributeSet: CreateAttributeSetDto, res: any) {
    let existAttribute = await this.getAttributeSetByName(attributeSet.name)
    if (existAttribute) {
      return res.status(HttpStatus.FOUND).json({ message: 'attribute set already exist.' });
    }
    const newAttribute = this.attributeSetRepository.create(attributeSet);
    let data = await this.attributeSetRepository.save(newAttribute);
    return res.status(HttpStatus.OK).json({ data, message: 'Successfully created attribute set' })

  }

  async assignAttribute(attribute_ids: number[], attribute_set_id: number, position: number, res: any) {
    for (let i = 0; i < attribute_ids.length; i++) {
      const attribute_id = attribute_ids[i]
      let existAssignedAttribute = await this.getAssignedAttribute(attribute_id, attribute_set_id)
      if (!existAssignedAttribute) {
        if (!position && position !== 0) {
          position = await this.getMaxPositionValue(this.assignedAttributeRepository, 'assigned_attribute')
        }
        const newAssignedAttribute = this.assignedAttributeRepository.create({ attribute_id, attribute_set_id, position });
        await this.assignedAttributeRepository.save(newAssignedAttribute);
      }
    }
    return res.status(HttpStatus.OK).json({ message: 'Successfully assigned attributes' })
  }

  async unassignAttribute(attribute_ids: number[], attribute_set_id: number, res: any) {
    try {
    for (let i=0; i< attribute_ids.length; i++) {
      const attribute_id = attribute_ids[i]
      let attribute = await this.checkAttributeExist({id:attribute_id})
      await this.assignedAttributeRepository.delete({ attribute_id, attribute_set_id });
    }
    return res.status(HttpStatus.OK).json({ message: 'Successfully unassigned attributes' })
  } catch (error) {
    console.log(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
  }
  }

  async checkAttributeExist(filter: any): Promise<Attribute> {
    return await this.attributeRepository.findOne({ where: {...filter, is_deleted: false}, select: {id:true} })
  }

  async getAttributeTypeByName(name: string): Promise<AttributeType> {
    return await this.attributeTypeRepository.findOne({ where: { name } })
  }

  async getAttributeSetByName(name: string): Promise<AttributeSet> {
    return await this.attributeRepository.findOne({ where: { name, is_deleted:false } })
  }

  async getAssignedAttribute(attribute_id: number, attribute_set_id: number): Promise<AssignedAttribute> {
    let attribute = await this.checkAttributeExist({id:attribute_id})
    return await this.assignedAttributeRepository.findOne({ where: { attribute_id, attribute_set_id } })
  }

  async getMaxPositionValue(repository:any, tableName:string) {
    let maxPosition = await repository.createQueryBuilder(tableName).select(`MAX(${tableName}.position)`, "max").getRawOne()
    return (maxPosition && (maxPosition.max || maxPosition.max === 0)) ? maxPosition.max + 1 : 0
  }

  async getAllAssignedAttributeByAttributeSet(attribute_set_id: number, res: any) {
    try {
      // let assignedAttributeList = await this.assignedAttributeRepository.find({ where: { attribute_set_id }, relations: ['attribute'] , order:{position:'ASC'} })
      let assignedAttributeList = (await this.assignedAttributeRepository.find({ where: { attribute_set_id }, order:{position:'ASC'} })).map(x=>x.attribute_id)
      // let data = assignedAttributeList.map((assignedAttribute) => assignedAttribute.attribute && assignedAttribute.attribute.name)
      let data = (await this.attributeRepository.find({where:{id:In(assignedAttributeList)}})).map(x => {return {id:x.id, name:x.name}})
      return res.status(HttpStatus.OK).json({ data, message: 'Successfully fetch all assigned attribute list' })
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
    }
  }

  async getAllUnassignedAttribute(attribute_set_id: number, res: any) {
    try {
      let attributeIds = (await this.assignedAttributeRepository.find({ where: { attribute_set_id } })).map(x=>x.attribute_id)
      // let attributeIds = assignedAttributeList.map((assignedAttribute) => assignedAttribute.attribute && assignedAttribute.attribute.id)
      let data = (await this.attributeRepository.find({ where: { is_deleted: false } , order:{position:'ASC'} })).filter(x => !attributeIds.find(y => y == x.id)).map(x => {return {id:x.id, name:x.name}})
      return res.status(HttpStatus.OK).json({ data, message: 'Successfully fetch all unassigned attribute list' })
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
    }
  }

  async updateAttribute(attribute: UpdateAttributeDto, res: any) {
    try {
      let existAttribute = await this.checkAttributeExist({identifier:attribute.identifier})
      if (!existAttribute) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "attribute doesn't exist." });
      }
      let data = await this.attributeRepository.save({ ...existAttribute, ...attribute })
      return res.status(HttpStatus.OK).json({ data, message: 'Successfully updated attribute' })
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
    }
  }

  async updateAttributeSet(attributeSet: UpdateAttributeSetDto, res: any) {
    let existAttributeSet = await this.attributeSetRepository.find({ where: { id: attributeSet.id, is_deleted: false } })
    if (!existAttributeSet) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "attribute doesn't exist." });
    }
    let data = await this.attributeSetRepository.save(attributeSet)
    return res.status(HttpStatus.OK).json({ data, message: 'Successfully updated attribute set' })
  }

  async getAttributeList(attributeFilterInfo: any, res: any) {
    try {

      let sortQuery = {}
      if (attributeFilterInfo.sortKey && attributeFilterInfo.sortValue) {
        attributeFilterInfo.sortValue = attributeFilterInfo.sortValue.toLowerCase()
        if(attributeFilterInfo.sortKey == 'use_in_search' || attributeFilterInfo.sortKey == 'show_on_frontend' || attributeFilterInfo.sortKey == 'include_in_filters') {
          sortQuery[attributeFilterInfo.sortKey] = attributeFilterInfo.sortValue == "no" ? 'DESC' : 'ASC'
        }
        if ((attributeFilterInfo.sortValue == "asc" || attributeFilterInfo.sortValue == "desc")) {
          sortQuery[attributeFilterInfo.sortKey] = attributeFilterInfo.sortValue == "desc" ? 'DESC' : 'ASC'
        }
      } else {
        sortQuery['position'] = (!attributeFilterInfo.sortValue) ? 'ASC' : attributeFilterInfo.sortValue
      }

      const searchQuery = { is_deleted: false };
      if (attributeFilterInfo.searchFilter) {
        searchQuery['name'] = Like(`%${attributeFilterInfo.searchFilter}%`)
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
      }

      const attributeRecord = await this.attributeRepository.findAndCount({ where: searchQuery, skip: skip, take: limit, order: sortQuery, relations: ['attribute_type'], select });

      const totalItems = attributeRecord[1]
      const totalPages = Math.ceil(totalItems / limit);

      const data = {
        paginatedResults: attributeRecord[0],
        totalPages,
        numberOfRows: attributeRecord[0].length,
        currentPage: page,
        limit: limit,
        totalRecords: totalItems
      }

      return res.status(HttpStatus.OK).json({ data, message: 'Successfully fetch attribute list' })
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
    }
  }

  async getAttributeSetList(attributeSetFilterInfo: any, res: any) {
    try {

      let sortQuery = {}
      if (attributeSetFilterInfo.sort) {
        if ((attributeSetFilterInfo.sort == "asc" || attributeSetFilterInfo.sort == "desc")) {
          sortQuery['name'] = attributeSetFilterInfo.sort == "desc" ? 'DESC' : 'ASC'
        }
      }

      const searchQuery = { is_deleted: false };
      if (attributeSetFilterInfo.searchFilter) {
        searchQuery['name'] = Like(`%${attributeSetFilterInfo.searchFilter}%`)
      }

      const data = await this.attributeSetRepository.find({ where: searchQuery, order: sortQuery });

      return res.status(HttpStatus.OK).json({ data, message: 'Successfully fetch attribute set list' })
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
    }
  }

  async deleteAttribute(id: number, res: any) {
    try {
      let existAttribute = await this.checkAttributeExist({id})
      if (!existAttribute) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "attribute doesn't exist." });
      }
      let deletedAttribute = await this.attributeRepository.save({ ...existAttribute, is_deleted: true })
      return res.status(HttpStatus.OK).json({ message: 'Successfully deleted attribute' })
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
    }
  }

  async createAttributeOption(attributeOption: CreateAttributeOptionDto, res: any) {
    try {
      let existAttributeOption = await this.attributeOptionRepository.findOne({ where: { attribute_id: attributeOption.attribute_id, name: attributeOption.name } })
      if (existAttributeOption) {
        return res.status(HttpStatus.FOUND).json({ message: 'attribute option already exist.' });
      }
      if(!attributeOption.position && attributeOption.position !== 0) {
        attributeOption.position = await this.getMaxPositionValue(this.attributeOptionRepository, 'attribute_option')
      }
      const newAttributeOption = this.attributeOptionRepository.create(attributeOption);
      return await this.attributeOptionRepository.save(newAttributeOption);
      // return res.status(HttpStatus.OK).json({ data, message: 'Successfully created attribute option' })
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
    }
  }

  async deleteAttributeSet(attributeSetId: number, res: any) {
    try {
      let existAttributeSet = await this.attributeSetRepository.findOne({ where: { id: attributeSetId, is_deleted: false } })
      if (!existAttributeSet) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "attribute don't exist." });
      }
      let deletedAttribute = await this.attributeRepository.save({ ...existAttributeSet, is_deleted: true })
      if (deletedAttribute) return res.status(HttpStatus.OK).json({ message: 'Successfully deleted attribute set' })
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL SERVER ERROR' });
    }
  }
}
