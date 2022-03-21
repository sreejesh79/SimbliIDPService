import { IBaseEntity } from '../entity/baseentity';
import { Service } from 'typedi';
import { UtilityScripts } from '../../utils/utilityscripts.utils';
import { OtpDTO } from '../dto/otp.dto';
import { EmailsOTPRepository } from '../repositories/emailsotp.repository';
import { EmailDTO } from '../dto/email.dto';
import { SendGridService } from './email.service';
import { Expiries, Messages } from 'config/constants';
import { IResponse } from 'types';
import { TokenUtils } from '../../utils/token.utils';
import Responses from 'config/responses';
import { Logger } from 'config/logger';
import { LamdaUtils } from '../../utils/lamda.utils';
import { KMSSignResponse } from '../dto/lamda.dto';
import { IUserDTO } from 'api/dto/users.dto';

@Service()
export class AuthService {
	constructor (
        private _emailOtpRepo: EmailsOTPRepository,
        private _utilityScripts: UtilityScripts,
        private _tokenUtils: TokenUtils,
        private _emailService: SendGridService,
        private _messages: Messages,
		private _lamdaUtils: LamdaUtils,
		private _expiries: Expiries
	) { }

	public sendOtp = async ( data: OtpDTO ): Promise<IResponse> => {
		const otp: string = this._utilityScripts.generateOTP();
		const otpToken: string = this._tokenUtils.generateOtpAccessToken( data.email );
		Logger.debug( otpToken );
		const expiry: number = this._utilityScripts.generateExpiry( this._expiries.OTP_EXPIRY );
		const dataCopy: OtpDTO = { ...data, otp, otp_token: otpToken, expiry };
		const emailData: EmailDTO = <EmailDTO>{
			from: process.env.FROM_EMAIL,
			to: dataCopy.email,
			subject: this._messages.OTP_MAIL_SUBJECT,
			html: `<p>To register with Simbli, please confirm your email by entering the OTP provided below.<br/><br/><h1>${dataCopy.otp}</h1><br/><br/>Thanks<br/><br/>Zenler Team</p>`
		};
		const emailResponse: IResponse = await this._emailService.sendMail( emailData );
		if ( !emailResponse.error ) {
			const emailOTPResponse: IBaseEntity = await this._emailOtpRepo.updateEmailOtp( dataCopy );
			if ( emailOTPResponse && emailOTPResponse.id ) {
				return Responses[200]( emailOTPResponse );
			} else {
				return  Responses[500]( emailOTPResponse.toString() );
			}
		}
		return emailResponse;
	};

	public verifyOtp = async ( data: OtpDTO ): Promise<IResponse> => {
		const currentTime: number = new Date().getTime();
		const result: IBaseEntity = await this._emailOtpRepo.getByOTP( data.email, data.otp, currentTime );
		if ( result && result.id ) {
			const registerToken: string = this._tokenUtils.generateRegisterToken( data.email );
			return Responses[200]( registerToken );
		} else {
			return Responses[400]( this._messages.INVALID_VERIFYOTP );
		}
	};

	public newAccessToken = async ( user: IUserDTO ): Promise<string> => {
		const accessToken: KMSSignResponse = await this._tokenUtils.generateAccessToken( user.email );
		return accessToken.token;
	};

	public login = async ( user: IUserDTO ): Promise<IUserDTO> => {
		const refreshToken: string = this._tokenUtils.generateRefreshToken( user.email );
		const accressToken: string = await this.newAccessToken( user );
		user.refresh_token = refreshToken;
		user.access_token = accressToken;
		delete user.password;
		return user;
	};

}