import { IResponse } from 'types';

export class Forbidden implements IResponse {
	error = true;
	statusCode = 400;
	status = 'Forbidden';
	message = '';
	data: any = {};

	constructor ( msg = '' ) {
		this.message = `${msg}`;
	}
}
