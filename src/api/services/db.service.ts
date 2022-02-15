import DB from '../../config/db';
import { Connection, EntityTarget, getConnection, Repository } from 'typeorm';
import { IDBService } from '../../types';

export class DBService implements IDBService {

    public connection: Connection = null;
    public getRepository ( model: EntityTarget<unknown> ): Repository<unknown> {
        return this.connection.getRepository( model );
    }

    public find = async ( model: EntityTarget<unknown>, options: unknown = {} ): Promise<unknown> => {
        try {
            const repo: Repository<unknown> = this.getRepository( model );
            const data: unknown = await repo.find( options );
            return data;
        } catch ( e: unknown ) {
            return e;
        }
    };

    public findOne = async ( model: EntityTarget<unknown>, options: unknown = {} ): Promise<unknown> => {
        try {
            const repo: Repository<unknown> = this.getRepository( model );
            const data: unknown = await repo.findOne( options );
            return data;
        } catch ( e: unknown ) {
            return e;
        }
    };

    public create = async ( model: EntityTarget<unknown>, insertData: unknown ): Promise<unknown> => {
        try {
            const repo: Repository<unknown> = this.getRepository( model );
            const intertedData: any = await repo.create( insertData );
            const results: unknown = await repo.save( intertedData );
            return results;
        } catch ( e: unknown ) {
            return e;
        }
    };

    public update = async ( model: EntityTarget<unknown>, insertData: unknown, originalData?: unknown ): Promise<unknown> => {
        try {
            const repo: Repository<unknown> = this.getRepository( model );
            if ( originalData ) {
                repo.merge( originalData, insertData );
                const results: unknown = await repo.save( originalData );
                return results;
            }
        } catch ( e: unknown ) {
            return e;
        }
    };
}

export class MASTERDBService extends DBService {

    private static _singleton = true;
    private static _instance: MASTERDBService;

    constructor () {
        super();
        if ( MASTERDBService._singleton ) {
            throw new SyntaxError( "This is a singleton class. Please use MYSQLService.instance instead!" );
        } else {
            super.connection = getConnection( DB.MASTER_DB_NAME );
        }
    }

    public static get instance (): MASTERDBService{
        if ( !this._instance ) {
            this._singleton = false;
            this._instance = new MASTERDBService();
            this._singleton = true;
        }
        return this._instance;
    }
}
