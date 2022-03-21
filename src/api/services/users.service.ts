import { UsersRepository } from '../repositories/users.repository';
import { IBaseEntity } from 'entity/baseentity';
import { Service } from 'typedi';
import { IUserDTO, UsersRegisterDTO } from 'api/dto/users.dto';
import { throwError } from 'config/errors';
import { PasswordUtils } from '../../utils/password.utils';
import { TokenUtils } from '../../utils/token.utils';
import { KMSSignResponse } from 'api/dto/lamda.dto';
import { Logger } from 'config/logger';

@Service()
class UsersService {

	constructor ( private _usersRepository: UsersRepository,
				private _passwordUtils: PasswordUtils,
				private _tokenUtils: TokenUtils ) { }

	public getAll = async (): Promise<IBaseEntity[]> => {
		const result: IBaseEntity[] = await this._usersRepository.getAll();
		return result;
	};

	public save = async ( data: UsersRegisterDTO ): Promise<IUserDTO> => {
		const user: IBaseEntity =  await this._usersRepository.getByEmail( data.email );
		if ( user ) {
			return throwError( 'Email already exists.', 400 );
		}
		// const password: string = data.password;
		// data.password = await this._passwordUtils.hashPassword( data.password );
		data.refresh_token =  this._tokenUtils.generateRefreshToken( data.email );
		const result: unknown = await this._usersRepository.save( data );
		Logger.debug( JSON.stringify( result ) );
		const userResponse: IUserDTO = <IUserDTO>result;
		delete userResponse.password;
		if ( userResponse && userResponse.id ) {
			const kmsSignResponse: KMSSignResponse = await this._tokenUtils.generateAccessToken( userResponse.email );
			userResponse.access_token = kmsSignResponse.token;
		}
		return userResponse;
	};

	public getByEmail = async ( email: string ): Promise<IUserDTO> => {
		const result: unknown =  await this._usersRepository.getByEmail( email );
		const userResponse: IUserDTO = <IUserDTO>result;
		return userResponse;
	};
}

export default UsersService;