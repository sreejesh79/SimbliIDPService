import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity( 'users' )
export class Users {
    @PrimaryColumn( 'varchar' )
    	id: string;

    @Column( 'varchar' )
    	email: string;

    @Column( 'varchar' )
    	password: string;

    @Column( 'varchar' )
    	mobile: string;

    @Column( 'varchar' )
    	refresh_token: string;

    @Column( 'timestamp' )
    	created_at: number;

    @Column( 'timestamp' )
    	updated_at: number;

}