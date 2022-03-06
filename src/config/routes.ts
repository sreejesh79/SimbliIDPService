/* eslint-disable */ 
import { Application } from "express";
import loggerMiddleware from '../api/middlewares/reqlogs.middleware';

export interface RouteDefinition {
	path: string;
    method: 'get' | 'post' | 'delete' | 'put';
    methodName: string;
}

export const BASE_PATH: string = '/api';

export const Middlewares = (app: Application): void => {
    app.all( '*',  loggerMiddleware );
}

export const Controllers = () => {
    require('../api/controllers/users.controller');
    require('../api/controllers/roles.controller');
}