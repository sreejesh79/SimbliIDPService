/* eslint-disable */ 
import { createConnections, ConnectionOptions, Connection, getConnection } from 'typeorm';
import { UsersEntity } from '../api/entity/users.entity';
import { RolesEntity } from '../api/entity/roles.entity';
import { EmailsotpEntity } from '../api/entity/emailsotp.entity';
import { OnboardingEntity } from '../api/entity/onboarding.entity';

class DB {

	public static readonly MASTER_DB_NAME: string = 'postgres';
	public static readonly MONGO_DB_NAME: string = 'mongodb';

	private static _connections: Connection[];

	private static _masterDB: ConnectionOptions;
	private static _mongoDB: ConnectionOptions;

	public static async init (): Promise<any> {
		DB._masterDB = {
			name: DB.MASTER_DB_NAME,
			type: 'postgres',
			host: process.env.MASTER_DB_HOST,
			port: Number( process.env.MASTER_DB_PORT ),
			username: process.env.MASTER_DB_USER,
			password: process.env.MASTER_DB_PASSWORD,
			database: process.env.MASTER_DATABASE,
			entities: [UsersEntity, RolesEntity, EmailsotpEntity]
		};

		DB._mongoDB = {
			name: DB.MONGO_DB_NAME,
			type: 'mongodb',
			host: process.env.MONGO_DB_HOST,
			port: Number(process.env.MONGO_DB_PORT),
			username: process.env.MONGO_DB_USER,
			password: process.env.MONGO_DB_PASSWORD,
			database: process.env.MONGO_DATABASE,
			entities: [OnboardingEntity],
			synchronize: true	
		}

		this._connections = await createConnections( [
			this._masterDB,
			this._mongoDB
		] );
		console.log( '\x1b[35mINFO\x1b[0m', `Master DB successfully connected to ${process.env.MASTER_DB_HOST}:${process.env.MASTER_DB_PORT}` );
		console.log( '\x1b[35mINFO\x1b[0m', `Mongo DB successfully connected to ${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}` );
	}

	public static get connections (): any {
		return this._connections;
	}


}

export default DB;

export const masterDBConnection = () => {
	return getConnection( DB.MASTER_DB_NAME );
};

export const mongoDBConnection = () => {
	return getConnection( DB.MONGO_DB_NAME );
}