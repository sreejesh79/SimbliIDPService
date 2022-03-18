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

export interface IUserResponse {
    id: number;
    email: string;
    mobile: string;
    password? :string;
    refresh_token: string;
    access_token?: string;
    created_at: number;
    updated_at: number;
}

export {};

declare global {
  namespace Express {
    interface Request {
      user: IUserResponse;
    }
  }
}