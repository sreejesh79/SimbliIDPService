import  { OK } from '../api/responses/200';
import  { NotFound } from '../api/responses/404';
import { ServerError } from '../api/responses/500';
import { Forbidden } from '../api/responses/403';
import { BadRequest } from '../api/responses/400';
import {  IResponse } from 'types';

class Responses {

	public static 200 ( data: any ): IResponse {
		return new OK( data );
	}
	public static 404 ( msg = '' ): IResponse {
		return new NotFound( msg );
	}

	public static 500 ( msg: string ): IResponse {
		return new ServerError( msg );
	}

	public static 403 ( msg = '' ): IResponse {
		return new Forbidden( msg );
	}

	public static 400 ( msg = '' ): IResponse {
		return new BadRequest( msg );
	}
}

export default Responses;