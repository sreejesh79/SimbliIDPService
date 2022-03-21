import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from './baseentity';
import { UsersEntity } from './users.entity';

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

    @ManyToMany( () => UsersEntity, ( users ) => users.roles )
    	users: UsersEntity[];

}