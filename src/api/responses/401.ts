import { IResponse } from 'types';

export class Unauthorized implements IResponse {
	error = true;
	statusCode = 401;
	statusText = 'Unauthorized';
	message = '';
	data: any = {};

	constructor ( msg = '' ) {
		this.message = `${msg}`;
	}
}
