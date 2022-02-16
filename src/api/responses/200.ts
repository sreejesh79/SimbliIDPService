import { IResponse } from 'types';


export class OK implements IResponse {
	error = false;
	status = 200;
	data: any = {};
	message = '';

	constructor ( data: unknown ) {
		this.data = data ;
	}
}
