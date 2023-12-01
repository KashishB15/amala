import { AttributeType } from './attribute-type.entity';
export declare class Attribute {
    id: number;
    name: string;
    identifier: string;
    is_default: number;
    is_required: number;
    include_in_filters: number;
    show_on_pdp: number;
    is_primary: number;
    show_on_frontend: number;
    use_in_search: number;
    use_for_product: number;
    use_for_collection: number;
    use_for_order: number;
    position: number;
    created_at: Date;
    updated_at: Date;
    attribute_type: AttributeType;
    is_deleted: boolean;
}
