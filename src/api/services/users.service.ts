import { UsersRepository } from '../repositories/users.repository';
import { IBaseEntity } from 'entity/baseentity';
import { Service } from 'typedi';

@Service()
class UsersService {

	constructor ( private _usersRepository: UsersRepository ) { }

	public getAll = async (): Promise<IBaseEntity[]> => {
		const result: IBaseEntity[] = await this._usersRepository.getAll();
		return result;
	};
}

export default UsersService;