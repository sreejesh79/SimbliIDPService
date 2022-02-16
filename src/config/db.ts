import { createConnections, ConnectionOptions, Connection } from 'typeorm';
import { Users } from '../api/entity/users';
import { Roles } from '../api/entity/roles';
import logger from '../utils/logger';

class DB {

	public static readonly MASTER_DB_NAME: string = 'postgres';
	private static _connections: Connection[];

	private static _masterDB: ConnectionOptions;

	public static async init (): Promise<any> {
		DB._masterDB = {
			name: DB.MASTER_DB_NAME,
			type: 'postgres',
			host: process.env.MASTER_DB_HOST,
			port: Number( process.env.MASTER_DB_PORT ),
			username: process.env.MASTER_DB_USER,
			password: process.env.MASTER_DB_PASSWORD,
			database: process.env.MASTER_DATABASE,
			entities: [Users, Roles]
		};
		this._connections = await createConnections( [
			this._masterDB
		] );
		logger.info( `Master DB successfully connected to ${process.env.MASTER_DB_HOST}:${process.env.MASTER_DB_PORT}` );
	}

	public static get connections (): any {
		return this._connections;
	}


}

export default DB;