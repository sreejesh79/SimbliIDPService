/* eslint-disable */ 
import { Application  } from 'express';
import winston, { LoggerOptions, transports, format } from 'winston';
import * as expressWinston from 'express-winston'

const LOG_COLORS: any = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'magenta'
}

export const Log = (app: Application) => {
    app.use(expressWinston.logger({
        level: 'debug',
        transports: [
          new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.colorize( { all: true } )
        )
    }));
}

export const ErrorLog = (app: Application) => {
    app.use(expressWinston.errorLogger({
        transports: [
            new winston.transports.Console(),
          new winston.transports.File({ filename: `${global.__basepath}/logs/errors.log`, level: 'error' }),
        ],
        format: winston.format.combine(
            winston.format.prettyPrint(),
           // winston.format.json(),
            winston.format.colorize({all: true}),
        ),
        msg: "HTTP -  {{req.url}} : {{err.message}}",
        meta: false,
        metaField: null,
        blacklistedMetaFields: ['exception',  'error', 'process', 'os', 'trace']
    }));
}

let loggerInstance: winston.Logger;

const skipInfo = format((info, opts) => {
    if (info.level == 'info') { return false; }
    return info;
})
      

const getLogger = () => {
    if ( !loggerInstance ) {
        const loggerOptions: LoggerOptions = {
            transports: [new transports.Console({
                level: 'info',
                format: format.combine(
                    format.timestamp(),
                    format.colorize( { all: true } ),
                    format.align(),
                    format.printf( info => `${info.timestamp} ${info.level}: ${info.message}`)
                )
            }), new transports.Console({
                level: 'debug',
                format: format.combine(
                    skipInfo(),
                    format.json(),
                    format.prettyPrint(),
                    format.colorize( { all: true} )
                )
            })]
        }
        winston.addColors(LOG_COLORS);

        loggerInstance = winston.createLogger( loggerOptions );
    } 
    return loggerInstance;
}

export class Logger {

    public static init = () => {
        return getLogger();
    }

    public static info = (data: any) => {
        getLogger().info(data);
    }

    public static debug = (data: any) => {
        getLogger().debug(data);
    }

    public static error = (data: any) => {
        getLogger().error(data);
    }
}


 


