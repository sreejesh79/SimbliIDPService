import { IResponse } from 'types';

export class NotFound implements IResponse {
	error = true;
	status = 404;
	message = 'Not Found';
	data: any = {};

	constructor ( msg = '' ) {
		this.message = `${this.message} ${msg}`;
	}
}
