import { Service } from 'typedi';

@Service()
export class Messages {
	public readonly OTP_MAIL_SUBJECT: string = 'Your Confirmation Code for Simbli';
	public readonly INVALID_VERIFYOTP: string = 'Invalid Data Found. Either an invaid email/otp or an expired otp was send.';
	public readonly INVALID_TOKEN: string = 'Token is not valid';
	public readonly TOKEN_BADREQUEST: string = 'Token not found in request';
	public readonly INVALID_LOGIN: string = 'Either your Email or password is wrong';
	public readonly LOGIN_BADREQUEST: string = 'Credentials not found in request';
}

@Service()
export class Expiries {
	public readonly OTP_EXPIRY: number = 60 * 5; // 5 minutes
	public readonly OTP_TOKEN_EXPIRY: number = 60 * 5; // 5 minutes
	public readonly REGISTER_TOKEN_EXPIRY: number = 60 * 10; // 10 minutes
	public readonly REFRESH_TOKEN_EXPIRY: number = ( 60 * 60 ) * 24; // 24 hrs
}
