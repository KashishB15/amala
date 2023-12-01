import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Attribute } from './attribute.entity';

@Entity()
export class AttributeType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    position: number;
    
    @Column()
    name: string;

    @ManyToOne(() => Attribute, attribute => attribute.attribute_type)
    attribute: Attribute;
    
}