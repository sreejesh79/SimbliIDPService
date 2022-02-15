import * as winston from 'winston';
import * as path from 'path';
import Settings from 'config/settings';

const logger: winston.Logger = winston.createLogger( {
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File( { filename: path.join( Settings.LOG_FOLDER_PATH, `${Settings.PROJECT_NAME}_error.log` ), level: 'error' } ),
        new winston.transports.File( { filename: path.join( Settings.LOG_FOLDER_PATH, `${Settings.PROJECT_NAME}_info.log` ) } ),
    ]
} );

if ( process.env.NODE_ENV !== 'production' ) {
    logger.add( new winston.transports.Console( {
      format: winston.format.simple(),
    } ) );
}

export default logger;