import {  Entity, Column } from 'typeorm';
import { BaseEntity } from '../entity/baseentity';

export interface IEmailsOTP {
    email: string;
    otp: string;
    otp_token: string;
    expiry: number;
}

@Entity( 'emails_otp' )
export class EmailsotpEntity extends BaseEntity implements IEmailsOTP {
    @Column( 'varchar' )
    	email: string;

    @Column( 'varchar' )
    	otp: string;

    @Column( 'varchar' )
    	otp_token: string;

    @Column( 'bigint' )
    	expiry: number;
}