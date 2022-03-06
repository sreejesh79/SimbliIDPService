import { Entity, Column } from 'typeorm';
import { BaseEntity } from './baseentity';

export interface IRolesEntity {
    id: number;
    machine_name: string;
    name: string;
}

@Entity( 'roles' )
export class RolesEntity extends BaseEntity implements IRolesEntity {

    @Column( 'varchar' )
    	machine_name: string;

    @Column( 'varchar' )
    	name: string;

}