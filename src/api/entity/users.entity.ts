import { Service } from 'typedi';
import { Entity, Column, AfterLoad, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import { TokenUtils } from '../../utils/token.utils';
import { PasswordUtils } from '../../utils/password.utils';
import { BaseEntity } from './baseentity';
import { RolesEntity } from './roles.entity';

export interface IUsersEntity {
    email: string;
    password: string;
    mobile: string;
    refresh_token: string;
}

@Entity( 'users' )
@Service()
export class UsersEntity extends BaseEntity implements IUsersEntity {

    @Column( 'varchar' )
    	email: string;

        @Column( 'varchar' )
    	fullname: string;

    @Column( { type: 'varchar' } )
    	password: string;

    @Column( 'varchar' )
    	mobile: string;

    @Column( 'varchar' )
    	refresh_token: string;

    @ManyToMany( () => RolesEntity, { eager: true } )
    @JoinTable( { name: 'users_roles' } )
    	roles: RolesEntity[];

    @BeforeInsert()
    async hashPassword () {
    	// this.password = await PasswordUtils.hashPassword( this.password );
    }

    @AfterLoad()
    deletePassword () {
    	// delete this.password;
    }

}