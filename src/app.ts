/* eslint-disable */ 
import "reflect-metadata";
import * as http from 'http';
import * as https from 'https';
import express from 'express';
import bodyParser from 'body-parser'; 
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
// import * as dotenv from 'dot'
import Bootstrap from './config/bootstrap';
import RouterConfig from './config/routes';
import Middleware from './config/middleware';
import DB from './config/db';
import * as path from 'path';
import * as fs from 'fs';

import Environment from './config/environment';

class App {

    private _app: express.Application;
    private _port: string;

    constructor() {
        global.__basepath = path.join(__dirname, '../');
        this._app = express();
        this.config(this._app);
    }

    

    private async config(app) {

        // middlewares
        app.use(helmet())
        // support application/json type post data
        app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        app.use(bodyParser.urlencoded({
            extended: false
        }));

        app.use(cookieParser());
        // Enables cors   
        app.use(cors());
        // load secured environment vars;
        Environment.init();
        // routes
        this.configRoutes(app);
       // this.initErrorHandling(app);

        // db connection
       // await this.initDbConnections();
       await DB.init();
        // bootsrap before the server is up.
        await Bootstrap.init();
        this.listen();
    }
    
    private configRoutes (app: express.Application){
        Middleware.routes(app);
        RouterConfig.routes(app);
    }

    private initErrorHandling (app: express.Application){
        const isProduction = (process.env.NODE_ENV === 'production');

        isProduction ? app.set('env', 'production') : app.set('env', 'development');
        app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: any = new Error('Not A Valid url');
            err.status = 404;
            next(err);
        });
        if (app.get('env') === 'development') {
            app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || 500);
                res.json({
                    message: err.message,
                    error: err
                });
            });
        }
        
        app.use(function(err: any, req: express.Request, res: express.Response, next: Function) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: {}
            });
        });
    }

    private listen() {
        this._port = process.env.PORT;
        const isProduction = (process.env.NODE_ENV === 'production');
        if (!isProduction) {
            const httpServer = http.createServer(this._app);
            httpServer.listen(this._port, () => {
            console.log(`App listening on the http://localhost:${this._port}`)
            // logger.info(`App listening on the http://localhost:${this._port}`);
            })
        } else {
            const httpsServer = https.createServer({
                key: fs.readFileSync(process.env.SSL_KEY),
                cert: fs.readFileSync(process.env.SSL_CERT),
              }, this._app);
              httpsServer.listen(this._port, () => {
                console.log(`App listening on the http://localhost:${this._port}`)
                // logger.info(`App listening on the http://localhost:${this._port}`);
                });
        }
        
    }
}

const server: App = new App();