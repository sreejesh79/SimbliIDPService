import { Service } from 'typedi';
import { masterDBConnection } from '../../config/db';
import { RolesEntity } from '../entity/roles.entity';


@Service()
export class RolesRepository {

	public get = async (): Promise<RolesEntity[]> => {
		const result: RolesEntity[] = await masterDBConnection().getRepository( RolesEntity ).find();
		return result;
	};
}