import { Controller } from '../../decorators/controller.decorator';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { Get, Post } from '../../decorators/route.decorator';
import { IResponse, IUserResponse } from 'types';
import { AuthService } from '../services/auth.service';
import { OtpDTO } from '../dto/otp.dto';
import UsersService from '../services/users.service';
import { UsersDTO } from 'api/dto/users.dto';
import Responses from 'config/responses';
import { Logger } from 'config/logger';

@Controller( '/auth' )
@Service()
export default class AuthController {

	constructor (
        private _authService: AuthService,
		private _userService: UsersService
	) {}
    @Post( '/otp/send' )
	public sendOTP = async ( req: Request, res: Response, next: NextFunction ) => {
    		try {
    			const response: IResponse = await this._authService.sendOtp( <OtpDTO>req.body );
    			return res.status( response.statusCode ).json( response );
    		} catch ( e ) {
    			next( e );
    		}
    	};

        @Post( '/otp/verify' )
    public verifyOtp = async ( req: Request, res: Response, next: NextFunction ) => {
        		try {
        			const response: IResponse = await this._authService.verifyOtp( <OtpDTO>req.body );
    			    return res.status( response.statusCode ).json( response );
        		} catch ( e ) {
        			next( e );
        		}
        	};

	@Post( '/register' )
        public save = async ( req: Request, res: Response, next: NextFunction ) => {
			try {
				const response: IUserResponse = await this._userService.save( <UsersDTO>req.body );
				if ( response && response.id ) {
					return res.json( Responses[200]( response ) );
				} else {
					return res.json( Responses[500]( 'Something went wrong.' ) );
				}
			} catch ( e ) {
				next ( e );
			}
		};

	@Get( '/token/refresh' )
	public refreshToken = async ( req: Request, res: Response, next: NextFunction ) => {
			try {
				Logger.debug( req.user );
				// res.json( req.user );
				const user: IUserResponse = req.user;
				const response: string = await this._authService.newAccessToken( user );
				if ( response ) {
					return res.json( Responses[200]( response ) );
				} else {
					return res.json( Responses[500]( 'Something went wrong.' ) );
				}
			} catch ( e ) {
				next( e );
			}
		};
}