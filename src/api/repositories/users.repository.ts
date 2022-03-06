import { Service } from 'typedi';
import { masterDBConnection } from '../../config/db';
import { UsersEntity } from '../entity/users.entity';

@Service()
export class UsersRepository {
	constructor () {}

	public getAll = async (): Promise<UsersEntity[]> => {
		const result: UsersEntity[] = await masterDBConnection().getRepository( UsersEntity ).find();
		return result;
	};
}