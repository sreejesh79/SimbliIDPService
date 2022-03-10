import { NextFunction, Request, Response } from 'express';
import { Logger  } from 'config/logger';
import { Service } from 'typedi';
import { Middleware } from '../../decorators/middleware.decorator';
import { Use } from '../../decorators/route.decorator';
import { TokenUtils } from '../../utils/token.utils';
import { IResponse } from 'types';
import Responses from 'config/responses';
import { OtpDTO } from 'api/dto/otp.dto';

@Middleware( '/api/auth/otp' )
@Service()
export class OTPMiddleware {

	constructor (
        private _tokenUtils: TokenUtils
	) {

	}
    @Use( '/verify' )
	public verifyOTP = ( req: Request, res: Response, next: NextFunction ) => {
    		const token: string = req.headers['x-otpaccess-token'].toLocaleString();
    		Logger.info( `Middleware: OTPMiddleware.verifyOTP() : ${JSON.stringify( req.body )} : x-otpaccess-token=${token}` );
    		const deniedResponse: IResponse = Responses[403]( 'OTP token is not valid.' );
    		const badreqResponse: IResponse = Responses[400]( 'OTP token not fond in request.' );
    		const body: OtpDTO = <OtpDTO>req.body;
    		if ( token ) {
    			const verifyResponse: IResponse = this._tokenUtils.verifyOtpAccessToken( token );
    			if ( verifyResponse.error ) {
    				return res.status( deniedResponse.statusCode ).json( deniedResponse );
    			} else {
    				Logger.debug( verifyResponse.data );
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
}

interface IPayload {
    email: string;
}
