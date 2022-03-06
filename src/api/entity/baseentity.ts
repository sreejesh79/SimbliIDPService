import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export interface IBaseEntity {
    id: number;
    createdAt: number;
    updatedAt: number;
}

@Entity()
export class BaseEntity implements IBaseEntity {
    @PrimaryColumn( 'int', {
    	primary: true
    } )
    @PrimaryGeneratedColumn( 'increment' )
    	id: number;

    @Column( { name: 'created_at', type: 'int' } )
    	createdAt: number;

    @Column( { name: 'updated_at', type: 'int' } )
    	updatedAt: number;
}