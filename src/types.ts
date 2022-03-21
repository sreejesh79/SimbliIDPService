/* eslint-disable */ 

import { Connection } from 'typeorm';

export interface IDBService {
    connection: Connection;
    getRepository( model: any ): any;
}

export interface IResponse {
    error: boolean;
    statusCode: number;
    statusText?: string;
    data?: any;
    message: string;
}



export {};

