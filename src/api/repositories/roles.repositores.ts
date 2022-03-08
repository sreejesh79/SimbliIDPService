import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { masterDBConnection } from '../../config/db';
import { RolesEntity } from '../entity/roles.entity';
import { IRepository } from './base.repository';


@Service()
export class RolesRepository implements IRepository {

	getRepository = (): Repository<RolesEntity> => {
		return masterDBConnection().getRepository( RolesEntity );
	};

	public get = async (): Promise<RolesEntity[]> => {
		const result: RolesEntity[] = await this.getRepository().find();
		return result;
	};
}