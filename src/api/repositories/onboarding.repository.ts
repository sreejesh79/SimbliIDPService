/* eslint-disable */ 

import { IRepository } from "./base.repository";
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { OnboardingEntity } from "../entity/onboarding.entity";
import { masterDBConnection } from '../../config/db';
import { IOnboardingDTO } from "api/dto/auth.dto";

@Service()
export class OnboardingRepository implements IRepository {

    constructor () {}

    getRepository = (): Repository<OnboardingEntity> => {
        return masterDBConnection().getRepository( OnboardingEntity );
    }

    public save = async (data: IOnboardingDTO): Promise<OnboardingEntity> => {
        const onboardingInstance: OnboardingEntity = this.getRepository().create(data);
        return await this.getRepository().save(onboardingInstance);
    }
}