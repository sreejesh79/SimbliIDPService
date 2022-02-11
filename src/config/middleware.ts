import loggerMiddleware from '../api/middlewares/logger';
import express from 'express';

class Middleware {

    public static routes(app: express.Application): void {
        app.all("*",  loggerMiddleware);
    }
}

export default Middleware;