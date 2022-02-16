import { IResponse } from 'types';

export class ServerError implements IResponse {
	error = true;
	status = 500;
	message = 'Internal Server Error';
	data: any = {};

	constructor ( msg: string ) {
		this.message = `${this.message} ${msg}`;
	}
}
