/* eslint-disable */ 
import express from 'express';
import Container from 'typedi';
import winston from 'winston';
import { Logger } from '../config/logger';
import { RouteDefinition } from '../config/routes';
import { BASE_PATH } from '../config/routes';

export const router = express.Router();
const app: express.Application = express();

export const Controller = ( prefix: string ): ClassDecorator => {
	return ( target: any ) => {
		Reflect.defineMetadata( 'prefix', prefix, target );
		if ( !Reflect.hasMetadata( 'routes', target ) ) {
			Reflect.defineMetadata( 'routes', [], target );
		}
		const routes: RouteDefinition[] = Reflect.getMetadata( 'routes', target );
		const instance: any = Container.get( target );
		routes.forEach( ( route: RouteDefinition ) => {
			router[route.method](`${BASE_PATH}${prefix}${route.path}`, instance[route.methodName].bind(instance))
			Logger.info(`Route registered : ${route.method} ${prefix}${route.path} with ${target.name}.${route.methodName}()`);
		} );
	};
};