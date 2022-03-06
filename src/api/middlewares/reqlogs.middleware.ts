import { Request, Response } from 'express';
import { Logger  } from 'config/logger';

const loggerMiddleware = ( req: Request, resp: Response, next: () => void ) => {
	// console.log('Request logged:', req.method, req.path)
	Logger.info( `Request logged: ${req.method} ${req.path}` );
	next();
};

export default loggerMiddleware;