import { Request, Response } from 'express';
import logger from "../../utils/logger";

const loggerMiddleware = ( req: Request, resp: Response, next: () => void ) => {
    // console.log('Request logged:', req.method, req.path)
    logger.info( `Request logged: ${req.method} ${req.path}` );
    next();
};

export default loggerMiddleware;