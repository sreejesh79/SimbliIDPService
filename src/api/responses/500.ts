import { IResponse } from 'types';

export class ServerError implements IResponse {
	error = true;
	statusCode = 500;
	statusText = 'Internal Server Error';
	message = '';

	constructor ( msg: string ) {
		this.message = `${this.message} ${msg}`;
	}
}
