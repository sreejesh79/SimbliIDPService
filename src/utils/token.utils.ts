/* eslint-disable */ 
import { Service } from 'typedi';
import * as jwt from 'jsonwebtoken';
import Responses from 'config/responses';
import { IResponse } from 'types';
import { Expiries } from 'config/constants';
import { IKMSHeaders, KMSSignDTO, KMSSignResponse } from '../api/dto/lamda.dto';
import { LamdaUtils } from './lamda.utils';
import { IAccessTokenPayloadDTO, ICryptoDTO, IMagiclinkPayloadDTO } from 'api/dto/auth.dto';
import { Logger } from 'config/logger';

@Service()
export class TokenUtils {

    constructor (
        private _expiries: Expiries,
        private _kmsSignDto: KMSSignDTO,
        private _lamdaUtils: LamdaUtils
    ) {

    }
    public generateOtpAccessToken = ( email: string ): string => {
        const secret: string = process.env.OTP_ACCESS_TOKEN_SECRET;
        const payload: IPayload = {
            email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (this._expiries.OTP_TOKEN_EXPIRY)
        }
		return this.generateH256Token( payload, secret);
	};
    public generateMobileOtpAccessToken = ( mobile: string ): string => {
        const secret: string = process.env.OTP_ACCESS_TOKEN_SECRET;
        const payload: IMobilePayload = {
            mobile,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (this._expiries.OTP_TOKEN_EXPIRY)
        }
		return this.generateMobileH256Token( payload, secret);
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

    public generateRegisterToken =  (email: string): string => {
        const secret: string = process.env.REGISTER_TOKEN_SECRET;
        const payload: IPayload = {
            email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (this._expiries.REGISTER_TOKEN_EXPIRY)
        }
        const token: string = this.generateH256Token( payload, secret);
        return token;

    }

    public verifyRegisterToken = ( token: string ): IResponse => {
        try {
            const secret: string = process.env.REGISTER_TOKEN_SECRET;
            var decoded: any = jwt.verify(token, Buffer.from(secret).toString('base64') , { algorithm: 'HS256' });
            return Responses[200](decoded);
        } catch (e) {
            return Responses[403](e.message);
        }
    }

    public  generateRefreshToken = ( email: string ): string => {
        const secret: string = process.env.REFRESH_TOKEN_SECRET;
        const payload: IPayload = {
            email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (this._expiries.REFRESH_TOKEN_EXPIRY)
        }
        const token: string = this.generateH256Token( payload, secret);
        return token;
    }

    public verifyRefreshToken = ( token: string ): IResponse => {
        try {
            const secret: string = process.env.REFRESH_TOKEN_SECRET;
            var decoded: any = jwt.verify(token, Buffer.from(secret).toString('base64') , { algorithm: 'HS256' });
            return Responses[200](decoded);
        } catch (e) {
            console.log('e.message', e.message);
            return Responses[403](e.message);
        }
    }

    public generateAccessToken = async ( payload: IAccessTokenPayloadDTO ): Promise<KMSSignResponse> => {
        const headers: IKMSHeaders = {
            keyId: process.env.ACCESSTOKEN_KEY_ID
        }
        const kmsSignData: KMSSignDTO = {
            payload,
            headers
        }
        const accessToken: KMSSignResponse =  <KMSSignResponse>await this._lamdaUtils.kmsJwtSign( kmsSignData );
        return accessToken;
    }

    public generateMagicLinkToken = async ( payload: ICryptoDTO ): Promise<KMSSignResponse> => {
        const headers: IKMSHeaders = {
            keyId: process.env.MAGICLINK_KEY_ID
        }
        const kmsSignData: KMSSignDTO = {
            payload,
            headers
        }
        Logger.debug(headers);
        const magicLinkToken: KMSSignResponse = <KMSSignResponse>await this._lamdaUtils.kmsJwtSign(kmsSignData);
        return magicLinkToken
    }
    public generateH256Token = ( payload: IPayload, secret: string ): string => {
        return jwt.sign( payload, Buffer.from(secret).toString('base64'), {
			algorithm: 'HS256',
			subject: JSON.stringify( payload )
		} );
    }
    public generateMobileH256Token = ( payload: IMobilePayload, secret: string ): string => {
        return jwt.sign( payload, Buffer.from(secret).toString('base64'), {
			algorithm: 'HS256',
			subject: JSON.stringify( payload )
		} );
    }


}

export interface IPayload {
    email: string,
    iat: number,
    exp: number
}

export interface IMobilePayload {
    mobile: string,
    iat: number,
    exp: number
}