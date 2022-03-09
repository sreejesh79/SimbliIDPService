/* eslint-disable */ 

export interface RouteDefinition {
	path: string;
    method: 'get' | 'post' | 'delete' | 'put' | 'use' | 'all';
    methodName: string;
}

export const BASE_PATH: string = '/api';
export const Middlewares = (): void => {
    require("../api/middlewares/api.middleware");
    require("../api/middlewares/user.middleware");

}

export const Controllers = () => {
    require('../api/controllers/main.controller');
    require('../api/controllers/users.controller');
    require('../api/controllers/roles.controller');
    require('../api/controllers/email.controller');
}