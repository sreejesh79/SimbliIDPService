import { UsersRepository } from '../repositories/users.repository';
import { IBaseEntity } from 'entity/baseentity';
import { Service } from 'typedi';
import { UsersDTO } from 'api/dto/users.dto';
import { throwError } from 'config/errors';
import { PasswordUtils } from '../../utils/password.utils';

@Service()
class UsersService {

	constructor ( private _usersRepository: UsersRepository,
				private _passwordUtils: PasswordUtils ) { }

	public getAll = async (): Promise<IBaseEntity[]> => {
		const result: IBaseEntity[] = await this._usersRepository.getAll();
		return result;
	};

	public save = async ( data: UsersDTO ): Promise<IBaseEntity> => {
		const user: IBaseEntity =  await this._usersRepository.getByEmail( data.email );
		if ( user ) {
			return throwError( 'Email already exists.', 400 );
		}
		const password: string = data.password;
		data.password = await this._passwordUtils.hashPassword( data.password );
		const result: IBaseEntity = await this._usersRepository.save( data );
		return result;
	};
}

export default UsersService;