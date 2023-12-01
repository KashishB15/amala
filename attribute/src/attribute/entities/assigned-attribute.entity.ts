import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Attribute } from './attribute.entity';
import { AttributeSet } from './attribute_set.entity';

@Entity()
export class AssignedAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    position: number;

    @Column()
    attribute_set_id: number;

    
    @Column()
    attribute_id: number;

    // @ManyToOne(() => Attribute, attribute => attribute.assignSet)
    // @JoinColumn({ name: 'attribute_id' })
    // attribute: Attribute;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}