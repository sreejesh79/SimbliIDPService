import { Service } from 'typedi';

@Service()
export class Messages {
	public readonly OTP_MAIL_SUBJECT: string = 'Your Confirmation Code for Simbli';
}

@Service()
export class Utils {
	public readonly OTP_EXPIRY: number = 5; // in minutes
}