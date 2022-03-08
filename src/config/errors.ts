/* eslint-disable */ 

import { Application, Request, Response, NextFunction } from 'express';
import { IResponse } from 'types';
import Responses from './responses';

export class ErrorHandler {

	public static init = ( app: Application ) => {
		app.use( ( err: any, req: Request, res: Response, next: NextFunction ) => {
			const statusCode: number = err.statusCode ? err.statusCode : 500;
			const errResponse: IResponse = Responses[statusCode]( err.message );
			return res.status( errResponse.statusCode ).json( errResponse );
		} );

		app.use( ( req: Request, res: Response, next: NextFunction ) => {
			const errResponse: IResponse = Responses[404]( 'Not a valid url.' );
			return res.status( errResponse.statusCode ).json( errResponse );
		} );
	};
}

export const throwError = (msg: string, statusCode: number) => {
	const error: any = new Error(msg);
	error.statusCode = statusCode;
	throw error;
}