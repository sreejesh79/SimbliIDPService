/* eslint-disable */ 
// import { Router } from 'express';
import express from 'express';
import Container from 'typedi';
import winston from 'winston';
import { Logger } from '../config/logger';
import { RouteDefinition } from '../config/routes';
import { BASE_PATH } from '../config/routes';

// const logger: winston.Logger = Logger.getLogger;
export const router = express.Router();

export const Controller = ( prefix: string ): ClassDecorator => {
	return ( target: any ) => {
		Reflect.defineMetadata( 'prefix', prefix, target );
		if ( !Reflect.hasMetadata( 'routes', target ) ) {
			Reflect.defineMetadata( 'routes', [], target );
		}
		const routes: RouteDefinition[] = Reflect.getMetadata( 'routes', target );
		const instance: any = Container.get( target );
		routes.forEach( ( route: RouteDefinition ) => {
			Logger.info(`Route registered : ${route.methodName} ${prefix}${route.path} with ${target.name}`);
			router[route.method](`${BASE_PATH}${prefix}${route.path}`, instance[route.methodName].bind(instance))
		} );
	};
};