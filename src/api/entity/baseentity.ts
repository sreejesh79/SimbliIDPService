import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IBaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

@Entity()
export class BaseEntity implements IBaseEntity {
    @PrimaryColumn( 'int', {
    	primary: true
    } )
    @PrimaryGeneratedColumn( 'increment' )
    	id: number;

        @CreateDateColumn( { name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' } )
    	createdAt: Date;

        @UpdateDateColumn( { name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' } )
    	updatedAt: Date;
}