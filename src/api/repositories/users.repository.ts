import { UsersRegisterDTO } from 'api/dto/users.dto';
import { IBaseEntity } from 'entity/baseentity';
import { RolesEntity } from 'entity/roles.entity';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { masterDBConnection } from '../../config/db';
import { UsersEntity } from '../entity/users.entity';
import { IRepository } from './base.repository';

@Service()
export class UsersRepository implements IRepository {
	constructor () {}

	getRepository = (): Repository<UsersEntity> => {
		return masterDBConnection().getRepository( UsersEntity );
	};

	public getAll = async (): Promise<UsersEntity[]> => {
		const result: UsersEntity[] = await this.getRepository().find();
		return result;
	};

	public getByEmail = async ( email: string, select?: ( keyof UsersEntity )[] ): Promise<UsersEntity> => {
		const user: UsersEntity = await this.getRepository().findOne(  { email }, { select } );
		return user;
	};

	public save = async ( data: UsersRegisterDTO, role: IBaseEntity ): Promise<UsersEntity> => {
		const userInstance: UsersEntity = this.getRepository().create( data );
		const roleData: RolesEntity = <RolesEntity>role;
		userInstance.roles = [roleData];
		return await this.getRepository().save( userInstance );
	};
}