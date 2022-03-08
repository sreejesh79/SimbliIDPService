import { IResponse } from 'types';

export class NotFound implements IResponse {
	error = true;
	statusCode = 404;
	statusText = 'Not Found';
	message = '';
	data: any = {};

	constructor ( msg = '' ) {
		this.message = `${this.message} ${msg}`;
	}
}
