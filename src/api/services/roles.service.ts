import { Service } from 'typedi';
import { IBaseEntity  } from 'entity/baseentity';
import { RolesRepository } from '../repositories/roles.repositores';

@Service()
export class RolesService {

	constructor ( private _rolesRepository: RolesRepository ) { }

	public get = async (): Promise<IBaseEntity[]> => {
		const roles: IBaseEntity[] = await this._rolesRepository.get();
		return roles;
	};
}