/* eslint-disable */ 
import * as dotenv from 'dotenv';
import * as path from 'path';

class Environment {
	private static _envSelf: dotenv.DotenvConfigOutput;
	public static init = () => {
		const isProduction: boolean = ( process.env.NODE_ENV === 'production' );
		let envSelfPath: string;
		if ( isProduction ) {
			envSelfPath = path.join( global.__basepath as string, './.env.prod' );
			Environment._envSelf = dotenv.config( { path: envSelfPath  } );
		} else {
			envSelfPath = path.join( global.__basepath as string, './.env.dev' );
			Environment._envSelf = dotenv.config( { path: envSelfPath, debug: true } );
		}
		if ( Environment._envSelf.error ) {
			throw Environment._envSelf.error;
		}
	};

	public static get vars (): any[] {
		return [
			Environment._envSelf.parsed
		];
	}


}

export default Environment;