import {  Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';
import { BaseEntity } from './baseentity';

export interface IOnboardingEntity {
    _id: ObjectID;
    mobile: string;
    mobile_otp: string;
    otp_token: string;
    mobile_verified: number;
    email: string;
    register_token: string;
    link_roken: string;
    link: string;
    email_verified: number;
}

@Entity( 'onboarding' )
export class OnboardingEntity extends BaseEntity implements IOnboardingEntity {
    @ObjectIdColumn()
    	_id: ObjectID;

    @Column( 'string' )
    	mobile: string;

    @Column( 'string' )
    	mobile_otp: string;

    @Column( 'string' )
    	otp_token: string;

    @Column( 'number' )
    	mobile_verified: number;

    @Column( 'string' )
    	email: string;

    @Column( 'string' )
    	register_token: string;

    @Column( 'string' )
    	link_roken: string;

    @Column( 'string' )
    	link: string;

    @Column( 'number' )
    	email_verified: number;

}