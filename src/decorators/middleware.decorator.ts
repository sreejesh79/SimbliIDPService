/* eslint-disable */ 
import express from 'express';
import {APIMiddleware} from 'middlewares/api.middleware';
import Container from 'typedi';
import { Logger } from '../config/logger';
import {  RouteDefinition } from '../config/routes';
import { BASE_PATH } from '../config/routes';

export const mwRouter = express.Router();
// const app = express();
export const Middleware = ( prefix: string ): ClassDecorator => {
	return ( target: any ) => {
		Reflect.defineMetadata( 'prefix', prefix, target );
		if ( !Reflect.hasMetadata( 'routes', target ) ) {
			Reflect.defineMetadata( 'routes', [], target );
		}
		const routes: RouteDefinition[] = Reflect.getMetadata( 'routes', target );
		const instance: any = Container.get( target );
		routes.forEach( ( route: RouteDefinition ) => {
			mwRouter[route.method]( `${prefix}${route.path}`, instance[route.methodName].bind( instance ) );
            Logger.info( `Middleware registered : ${route.method} ${prefix}${route.path} with ${target.name}.${route.methodName}()` );
		} );
	};
};