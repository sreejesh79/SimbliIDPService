import { Logger } from 'config/logger';
import { Middleware } from '../../decorators/middleware.decorator';
import { Use } from '../../decorators/route.decorator';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { IResponse, IUserResponse } from 'types';
import Responses from 'config/responses';
import { TokenUtils, IPayload } from '../../utils/token.utils';
import UsersService from '../services/users.service';

@Middleware( '/api/auth' )
@Service()
export class AuthMiddleware {
	constructor (
        private _tokenUtils: TokenUtils,
        private _usersService: UsersService
	) {}
    @Use( '/token/refresh' )
	public validateRefreshToken = async ( req: Request, res: Response, next: NextFunction ) => {
    		const deniedResponse: IResponse = Responses[403]( 'Refresh token is not valid.' );
    	const badreqResponse: IResponse = Responses[400]( 'Refresh token not found in request.' );
    		if ( req.headers['x-refresh-token'] ) {
    			const refreshToken: string = req.headers['x-refresh-token'].toLocaleString();
    		const verifyResponse: IResponse = this._tokenUtils.verifyRefreshToken( refreshToken );
    		if ( !refreshToken ) {
    			return res.status( badreqResponse.statusCode ).json( badreqResponse );
    		}
    		if ( verifyResponse.error ) {
    			return res.status( deniedResponse.statusCode ).json( deniedResponse );
    		} else {
    			const payload: IPayload = <IPayload>verifyResponse.data;
    			const userResponse: IUserResponse = await this._usersService.getByEmail( payload.email );
    			if ( userResponse && userResponse.id && userResponse.refresh_token ===  refreshToken ) {
    				req.user = userResponse;
    				next();
    				return;
    			} else {
    				return res.status( deniedResponse.statusCode ).json( deniedResponse );
    			}
    		}
    		} else {
    			return res.status( badreqResponse.statusCode ).json( badreqResponse );
    		}
    	};
}