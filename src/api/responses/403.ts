import { IResponse } from 'types';

export class Forbidden implements IResponse {
	error = true;
	statusCode = 403;
	statusText = 'Forbidden';
	message = '';
	data: any = {};

	constructor ( msg = '' ) {
		this.message = `${msg}`;
	}
}
