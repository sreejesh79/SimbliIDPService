import { Controller } from '../../decorators/controller.decorator';
import { Request, Response, NextFunction, json } from 'express';
import { Service } from 'typedi';
import { Get, Post } from '../../decorators/route.decorator';
import { IResponse } from 'types';
import { AuthService } from '../services/auth.service';
import { OtpDTO, OtpMobileDTO } from '../dto/otp.dto';
import UsersService from '../services/users.service';
import { IUserDTO, UsersRegisterDTO } from '../dto/users.dto';
import Responses from 'config/responses';
import { Logger } from 'config/logger';
import { IMagiclinkPayloadDTO } from 'api/dto/auth.dto';

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
				const response: IUserDTO = await this._userService.save( <UsersRegisterDTO>req.body );
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
				const user: IUserDTO = req.user;
				const response: string = await this._authService.newAccessToken( user );
				if ( response ) {
					return res.json( Responses[200]( response ) );
				} else {
					return res.json( Responses[403]( 'Something went wrong.' ) );
				}
			} catch ( e ) {
				next( e );
			}
		};

	@Post( '/login' )
	public login = async ( req: Request, res: Response, next: NextFunction ) => {
			try {
				const user: IUserDTO = req.user;
				const response: IUserDTO = await this._authService.login( user );
				if ( response ) {
					return res.json( Responses[200]( response ) );
				} else {
					return res.json( Responses[403]( JSON.stringify( response ) ) );
				}
			} catch ( e ) {
				next( e );
			}
		};

	@Post( '/link' )
	public link = async ( req: Request, res: Response, next: NextFunction ) => {
			try {
				const linkResponse: IResponse = await this._authService.createMagicLink( <IMagiclinkPayloadDTO>req.body );
				return res.status( linkResponse.statusCode ).json( linkResponse );
			} catch ( e ) {
				next( e );
			}
		};
		@Post( '/otp/mobile/send' )
	public mobileOtp =async  ( req: Request, res: Response, next: NextFunction ) => {
				try{
					const otpResponse: IResponse = await this._authService.sendMobileOtp( <OtpMobileDTO>req.body );
					return res.status ( otpResponse.statusCode ).json( otpResponse.data );
				}
				catch( e ) {
					next( e );
				}
			};
			@Post( '/otp/mobile/verify' )
		public verifyMobileOtp = async   ( req: Request, res: Response, next: NextFunction ) => {
					try{
						 const verifyOtpResponse: IResponse = await this._authService.verifyMobileOtp( <OtpMobileDTO>req.mobileOtp );
						 return res.status ( verifyOtpResponse.statusCode ).json( verifyOtpResponse.data );
					}
					catch( e ) {
						next( e );
					}
				};
}