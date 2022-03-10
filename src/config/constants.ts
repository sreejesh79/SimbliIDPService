import { Service } from 'typedi';

@Service()
export class Messages {
	public readonly OTP_MAIL_SUBJECT: string = 'Your Confirmation Code for Simbli';
	public readonly INVALID_VERIFYOTP: string = 'Invalid Data Found. Either an invaid email/otp or an expired otp was send.';
}

@Service()
export class Utils {
	public readonly OTP_EXPIRY: number = 5; // in minutes
}
