import { Request, Response } from 'express';
import { Logger  } from 'config/logger';
import { throwError } from 'config/errors';

const loggerMiddleware = ( req: Request, resp: Response, next: () => void ) => {
	Logger.info( `Request logged: ${req.method} ${req.path}` );
	next();
};

export default loggerMiddleware;