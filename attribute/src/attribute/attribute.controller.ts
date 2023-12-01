import { Controller, Res, Post, Req, Delete, Param, Query, Get, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { CreateAttributeSetDto } from './dto/create-attribute-set.dto';
import { CreateAttributeTypeDto } from './dto/create-attribute-type.dto';
import { CreateAttributeOptionDto } from './dto/create-attribute-option.dto';
import { ApiBody, ApiExcludeEndpoint, ApiQuery } from '@nestjs/swagger';
import { UpdateAttributeSetDto } from './dto/update-attribute-set.dto';

@Controller()
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @MessagePattern('createAttribute')
  @Post('/create-attribute')
  createAttribute(@Payload() createAttributeDto: CreateAttributeDto, @Body('attributeOptions') attributeOptions: any,  @Res() res: Response) {
    return this.attributeService.createAttribute(createAttributeDto,attributeOptions, res);
  }

  @MessagePattern('getAttribute')
  @Get('/get-attribute-list')
  @ApiQuery({ name: 'searchFilter', required: false, type: String, description: "name"})
  @ApiQuery({ name: 'sortKey', required: false, type: String })
  @ApiQuery({ name: 'sortValue', required: false, type: String, enum:["asc","desc"]})
  @ApiQuery({ name: 'page', required: false, type: Number, description: "Page number (optional, default is 1)" })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: "Number of attributes per page (optional, default is 10)" })
  getAttribute(@Req() req : Request, @Res() res: Response, @Query('searchFilter') searchFilter?: string,@Query('sortKey') sortKey?: string, @Query('sortValue') sortValue?: string, @Query('page') page?: string, @Query('limit') limit?: string) {
    return this.attributeService.getAttributeList({searchFilter, sortKey,sortValue, page, limit}, res);
  }
  
  @MessagePattern('createAttributeSet')
  @Post('/create-attribute-set')
  createAttributeSet(@Payload() createAttributeSetDto: CreateAttributeSetDto, @Res() res: Response) {
    return this.attributeService.createAttributeSet(createAttributeSetDto, res);
  }

  @MessagePattern('getAttributeSet')
  @Get('/get-attribute-set')
  @ApiQuery({ name: 'searchFilter', required: false, type: String, description: "name"})
  @ApiQuery({ name: 'sort', required: false, type: String, enum:["asc","desc"] })
  getAttributeSet(@Req() req : Request, @Res() res: Response, @Query('searchFilter') searchFilter?: string, @Query('sort') sort?: string) {
    return this.attributeService.getAttributeSetList({searchFilter, sort}, res);
  }

  @MessagePattern('createAttributeType')
  @Post('/create-attribute-type')
  createAttributeType(@Payload() createAttributeTypeDto: CreateAttributeTypeDto, @Res() res: Response) {
    return this.attributeService.createAttributeType(createAttributeTypeDto, res);
  }
  

  @MessagePattern('getAttributeTypes')
  @Get('/get-attribute-type-list')
  getAttributeTypes(@Res() res: Response) {
    return this.attributeService.getAttributeTypes(res);
  }

  @MessagePattern('createAttributeOption')
  @Post('/create-attribute-option')
  createAttributeOption(@Payload() createAttributeOptionDto: CreateAttributeOptionDto, @Res() res: Response) {
    return this.attributeService.createAttributeOption(createAttributeOptionDto, res);
  }

  @MessagePattern('getAttributeOptions')
  @Get('/get-attribute-option-list')
  getAttributeOptions(@Res() res: Response, @Query('attribute_id') attribute_id: number) {
    return this.attributeService.getAttributeOptions(attribute_id,res);
  }

  @MessagePattern('getSingleAttribute')
  @Get('/get-single-attribute')
  getSingleAttribute(@Param('id') id: number, @Res() res: Response) {
    return this.attributeService.getSingleAttribute(id, res);
  }

  @Get('/get-attribute-option-list-for-multi-attributeids')
  @ApiExcludeEndpoint()
  getAttributeOptionsForMultiAttributes(@Res() res: Response, @Query('attribute_ids') attribute_ids: number[]) {
    return this.attributeService.getAttributeOptionsForAttributeIds(attribute_ids,res);
  }
  

  @MessagePattern('assignAttribute')
  @Post('/assign-attribute')
  @ApiBody({schema: {
    properties: {
        'attribute_ids': { type: 'array', example:[1,2,3,4] },
        'attribute_set_id' : { type: 'number', example: 1 },
        'position' : { type: 'number' }
    }
  }})
  assignAttributeSet(@Body('attribute_ids') attribute_ids: number[], @Body('attribute_set_id') attribute_set_id: number, @Body('position') position: number, @Res() res: Response) {
    return this.attributeService.assignAttribute(attribute_ids, attribute_set_id,position, res);
  }

  @MessagePattern('unassignAttribute')
  @Post('/unassign-attribute')
  @ApiBody({schema: {
    properties: {
        'attribute_ids': { type: 'array', example:[1,2,3,4] },
        'attribute_set_id' : { type: 'number', example: 1  }
    }
  }})
  unassignAttributeSet(@Body('attribute_ids') attribute_ids: number[],@Body('attribute_set_id') attribute_set_id: number, @Res() res: Response) {
    return this.attributeService.unassignAttribute(attribute_ids,attribute_set_id , res);
  }

  @MessagePattern('updateAttribute')
  @Post('/update-attribute')
  @ApiBody({schema: {
    properties: {
        'identifier': { type: 'string' }
    }
  }})
  updateAttribute(@Payload() updateAttributeDto: UpdateAttributeDto, @Res() res: Response) {
    return this.attributeService.updateAttribute(updateAttributeDto, res);
  }

  @MessagePattern('updateAttributeSet')
  @Post('/update-attribute-set')
  @ApiBody({schema: {
    properties: {
        'id': { type: 'number' }
    }
  }})
  updateAttributeSet(@Payload() updateAttributeSetDto: UpdateAttributeSetDto, @Res() res: Response) {
    return this.attributeService.updateAttributeSet(updateAttributeSetDto, res);
  }

  @Delete('/delete-attribute:id')
  deleteAttribute(@Param('id') id: number, @Res() res: Response) {
    return this.attributeService.deleteAttribute(id, res);
  }

  @Delete('/delete-attribute-set:id')
  deleteAttributeSet(@Param('id') id: number, @Res() res: Response) {
    return this.attributeService.deleteAttributeSet(id, res);
  }

  @MessagePattern('getAllAssignAttribute')
  @Get('/get-all-assign-attribute')
  getAllAssignAttribute(@Query('attribute_set_id') attribute_set_id : number, @Res() res: Response) {
    return this.attributeService.getAllAssignedAttributeByAttributeSet(attribute_set_id, res);
  }

  @MessagePattern('getAllUnassignedAttribute')
  @Get('/get-all-unassign-attribute')
  getAllUnassignedAttribute(@Query('attribute_set_id') attribute_set_id : number, @Res() res: Response) {
    return this.attributeService.getAllUnassignedAttribute(attribute_set_id, res);
  }
  
}
