import { IResponse } from 'types';

export class BadRequest implements IResponse {
	error = true;
	statusCode = 400;
	status = 'Bad Request';
	message = '';

	constructor ( msg = '' ) {
		this.message = `${msg}`;
	}
}