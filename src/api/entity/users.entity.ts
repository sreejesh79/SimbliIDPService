import { Entity, Column } from 'typeorm';
import { BaseEntity } from './baseentity';

export interface IUsersEntity {
    email: string;
    password: string;
    mobile: string;
    refresh_token: string;
}

@Entity( 'users' )
export class UsersEntity extends BaseEntity implements IUsersEntity {

    @Column( 'varchar' )
    	email: string;

    @Column( 'varchar' )
    	password: string;

    @Column( 'varchar' )
    	mobile: string;

    @Column( 'varchar' )
    	refresh_token: string;

}