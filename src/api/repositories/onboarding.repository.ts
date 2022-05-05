/* eslint-disable */ 

import { IRepository } from "./base.repository";
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { OnboardingEntity } from "../entity/onboarding.entity";
import { mongoDBConnection } from '../../config/db';
import { IMobileDTO, IOnboardingDTO } from "api/dto/auth.dto";

@Service()
export class OnboardingRepository implements IRepository {

    constructor () {}

    getRepository = (): Repository<OnboardingEntity> => {
        return mongoDBConnection().getRepository( OnboardingEntity );
    }

    public save = async (data: IOnboardingDTO): Promise<OnboardingEntity> => {
        const onboardingInstance: OnboardingEntity = this.getRepository().create(data);
        return await this.getRepository().save(onboardingInstance);
    }
    public saveMobile = async (data: IMobileDTO): Promise<OnboardingEntity> => {
        const onboardingInstance: OnboardingEntity = this.getRepository().create(data);
        return await this.getRepository().save(onboardingInstance);
    }
    public getByToken = async ( otp_token: string ): Promise<OnboardingEntity> => {
		const result: OnboardingEntity = await this.getRepository().findOne( { otp_token } );
		return result;
	};

}