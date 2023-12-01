import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { CreateAttributeSetDto } from './dto/create-attribute-set.dto';
import { CreateAttributeTypeDto } from './dto/create-attribute-type.dto';
import { CreateAttributeOptionDto } from './dto/create-attribute-option.dto';
import { UpdateAttributeSetDto } from './dto/update-attribute-set.dto';
export declare class AttributeController {
    private readonly attributeService;
    constructor(attributeService: AttributeService);
    createAttribute(createAttributeDto: CreateAttributeDto, res: Response): Promise<any>;
    getAttribute(req: Request, res: Response, searchFilter?: string, sortKey?: string, sortValue?: string, page?: string, limit?: string): Promise<any>;
    createAttributeSet(createAttributeSetDto: CreateAttributeSetDto, res: Response): Promise<any>;
    getAttributeSet(req: Request, res: Response, searchFilter?: string, sort?: string): Promise<any>;
    createAttributeType(createAttributeTypeDto: CreateAttributeTypeDto, res: Response): Promise<any>;
    getAttributeTypes(res: Response): Promise<any>;
    createAttributeOption(createAttributeOptionDto: CreateAttributeOptionDto, res: Response): Promise<any>;
    getAttributeOptions(res: Response, attribute_id: number): Promise<any>;
    getAttributeOptionsForMultiAttributes(res: Response, attribute_ids: number[]): Promise<any>;
    assignAttributeSet(attribute_ids: number[], attribute_set_id: number, position: number, res: Response): Promise<any>;
    unassignAttributeSet(attribute_ids: number[], attribute_set_id: number, res: Response): Promise<any>;
    updateAttribute(updateAttributeDto: UpdateAttributeDto, res: Response): Promise<any>;
    updateAttributeSet(updateAttributeSetDto: UpdateAttributeSetDto, res: Response): Promise<any>;
    deleteAttribute(id: number, res: Response): Promise<any>;
    deleteAttributeSet(id: number, res: Response): Promise<any>;
    getAllAssignAttribute(attribute_set_id: number, res: Response): Promise<any>;
    getAllUnassignedAttribute(attribute_set_id: number, res: Response): Promise<any>;
}
