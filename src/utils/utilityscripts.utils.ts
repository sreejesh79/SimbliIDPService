/* eslint-disable */ 
import { Service } from 'typedi';

@Service()
export class UtilityScripts {

	public generateOTP = (): string => {
		const otpGenerator = require( 'otp-generator' );
		const otp: string = otpGenerator.generate( 6, { alphabets:false, upperCase: false, specialChars: false } );
		console.log(otp);
		return otp;
	};

	public generateExpiry = (expiry: number): number => {
		const currentDate = new Date();
		const futureDate = new Date(currentDate.getTime() + expiry * 60000);
		const expiryTime: number = futureDate.getTime();
		return expiryTime;
	}
}