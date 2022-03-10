/* eslint-disable */ 
import { Service } from 'typedi';
import * as jwt from 'jsonwebtoken';

@Service()
export class TokenUtils {

    public generateOtpAccessToken = ( email: string ): string => {
		return jwt.sign( { email }, process.env.OTP_TOKEN_SECRET, {
			algorithm: 'HS256',
			expiresIn: '1h',
			subject: JSON.stringify( { email } )
		} );
	};
    
}