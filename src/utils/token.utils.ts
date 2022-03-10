/* eslint-disable */ 
import { Service } from 'typedi';
import * as jwt from 'jsonwebtoken';
import Responses from 'config/responses';
import { IResponse } from 'types';

@Service()
export class TokenUtils {

    public generateOtpAccessToken = ( email: string ): string => {
        const secret: string = process.env.OTP_ACCESS_TOKEN_SECRET;
		return jwt.sign( { email }, Buffer.from(secret).toString('base64'), {
			algorithm: 'HS256',
			expiresIn: '1h',
			subject: JSON.stringify( { email } )
		} );
	};

    public verifyOtpAccessToken = (token: string): IResponse => {
        try {
            const secret: string = process.env.OTP_ACCESS_TOKEN_SECRET;
            var decoded: any = jwt.verify(token, Buffer.from(secret).toString('base64') , { algorithm: 'HS256' });
            return Responses[200](decoded);
        } catch (e) {
            console.log('e.message', e.message);
            return Responses[403](e.message);
        }
    }

}