import { IResponse } from 'types';

export class BadRequest implements IResponse {
	error = true;
	status = 400;
	data: any = {};
	message = 'Bad Request';

	constructor ( msg = '' ) {
		this.message = `${this.message} ${msg}`;
	}
}