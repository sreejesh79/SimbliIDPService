import { Request, Response, NextFunction } from 'express';

export class MainController {

	public static index = ( req: Request, res: Response, next: NextFunction ) =>{
		try {
			res.status( 200 ).send( 'Welcome to Simbli IDP Service.' );
		} catch ( err ) {
			next( err );
		}
	};

}