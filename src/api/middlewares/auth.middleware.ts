import { Logger } from 'config/logger';
import { Middleware } from '../../decorators/middleware.decorator';
import { Use } from '../../decorators/route.decorator';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { IResponse } from 'types';
import Responses from 'config/responses';
import { TokenUtils, IPayload } from '../../utils/token.utils';
import UsersService from '../services/users.service';
import { Messages } from 'config/constants';
import { IUserDTO, UsersRegisterDTO } from '../dto/users.dto';
import { PasswordUtils } from '../../utils/password.utils';

@Middleware( '/api/auth' )
@Service()
export class AuthMiddleware {
	constructor (
        private _tokenUtils: TokenUtils,
        private _usersService: UsersService,
		private _messages: Messages,
		private _passwordUtils: PasswordUtils
	) {}
    @Use( '/token/refresh' )
	public validateRefreshToken = async ( req: Request, res: Response, next: NextFunction ) => {
    	const deniedResponse: IResponse = Responses[403]( this._messages.INVALID_TOKEN );
    	const badreqResponse: IResponse = Responses[400]( this._messages.TOKEN_BADREQUEST );
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
    				const userResponse: IUserDTO = await this._usersService.getByEmail( payload.email );
    				Logger.debug( userResponse );
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

	@Use( '/register/temp' )
    public verifyRegisterToken =  ( req: Request, res: Response, next: NextFunction ) => {
			const deniedResponse: IResponse = Responses[403]( this._messages.INVALID_TOKEN );
			const badreqResponse: IResponse = Responses[400]( this._messages.TOKEN_BADREQUEST );
			if ( req.headers['x-register-token'] ) {
				const registerToken: string = req.headers['x-register-token'].toLocaleString();
    			const verifyResponse: IResponse = this._tokenUtils.verifyRegisterToken( registerToken );
				const body: UsersRegisterDTO = <UsersRegisterDTO>req.body;
				if ( verifyResponse.error ) {
    				return res.status( deniedResponse.statusCode ).json( deniedResponse );
    			} else {
    				const payload: IPayload = <IPayload>verifyResponse.data;
    				if ( payload.email === body.email ) {
    					 next();
    					return;
    				} else {
    					return res.status( badreqResponse.statusCode ).json( 'Invalid Payload Email.' );
    				}
    			}
			} else {
				return res.status( badreqResponse.statusCode ).json( badreqResponse );
			}
		};

	@Use( '/login' )
	public verifyLogin = async ( req: Request, res: Response, next: NextFunction ) => {
			const deniedResponse: IResponse = Responses[403]( this._messages.INVALID_LOGIN );
			const badreqResponse: IResponse = Responses[400]( this._messages.LOGIN_BADREQUEST );
			const loginInput: ILogin = <ILogin>req.body;
			if ( !loginInput.email || !loginInput.password || loginInput.email === '' || loginInput.password === '' ) {
				return res.status( badreqResponse.statusCode ).json( badreqResponse );
			}
			const user: IUserDTO = await this._usersService.getByEmail( loginInput.email );
			if ( !user ) {
				return res.status( deniedResponse.statusCode ).json( deniedResponse );
			}
			const isValidPassword: boolean = await this._passwordUtils.comparePassword( loginInput.password, user.password );
			if ( isValidPassword ) {
				req.user = user;
				next();
				return;
			} else {
				return res.status( deniedResponse.statusCode ).json( deniedResponse );
			}
		};
}

interface ILogin {
	email: string;
	password: string;
}