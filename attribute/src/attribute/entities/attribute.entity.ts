import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { AssignedAttribute } from './assigned-attribute.entity';
import { AttributeType } from './attribute-type.entity';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  identifier: string;
   
  @Column()
  is_default: number;

  @Column()
  is_required: number;

  @Column()
  include_in_filters: number;
  
  @Column()
  show_on_pdp: number;

  @Column()
  is_primary: number;
  
  @Column()
  show_on_frontend: number;

  @Column()
  use_in_search: number;
  
  @Column()
  use_for_product: number;

  @Column()
  use_for_collection: number;
  
  @Column()
  use_for_order: number;
  
  @Column()
  position: number;
  
  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
  
  @ManyToOne(() => AttributeType, attributeType => attributeType.attribute)
  @JoinColumn({ name: 'attribute_type_id' })
  attribute_type: AttributeType;

  @Column({default:false})
  is_deleted: boolean;

  // @OneToMany(() => AssignedAttribute, assign => assign.attribute)
  // assignSet: AssignedAttribute[];
}

