import { Logger } from 'config/logger';
import { Middleware } from '../../decorators/middleware.decorator';
import { Use } from '../../decorators/route.decorator';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

@Middleware( '/api/users' )
@Service()
export class UserMiddleware {

    @Use( '/' )
	public register = ( req: Request, res: Response, next: NextFunction ) => {
    		Logger.info( 'I am in register' );
    		next();
    	};
}