/* eslint-disable */ 

import { Application, Request, Response, NextFunction } from 'express';
import { IResponse } from 'types';
import Responses from './responses';

export class ErrorHandler {

	public static init = ( app: Application ) => {
		app.use( ( err: any, req: Request, res: Response, next: NextFunction ) => {
			const errResponse: IResponse = Responses[500]( err.message );
			return res.status( errResponse.status ).json( errResponse );
		} );

		app.use( ( req: Request, res: Response, next: NextFunction ) => {
			const errResponse: IResponse = Responses[404]( 'Not a valid url.' );
			return res.status( errResponse.status ).json( errResponse );
		} );
	};
}