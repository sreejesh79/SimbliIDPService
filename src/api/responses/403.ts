import { IResponse } from 'types';

export class Forbidden implements IResponse {
	error = true;
	status = 400;
	message = 'Forbidden';
	data: any = {};

	constructor ( msg = '' ) {
		this.message = `${this.message} ${msg}`;
	}
}
