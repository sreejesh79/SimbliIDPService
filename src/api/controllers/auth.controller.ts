import { Controller } from '../../decorators/controller.decorator';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { Post } from '../../decorators/route.decorator';
import { IResponse } from 'types';
import { AuthService } from '../services/auth.service';
import { OtpDTO } from '../dto/otp.dto';

@Controller( '/auth' )
@Service()
export default class AuthController {

	constructor (
        private _authService: AuthService
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
}