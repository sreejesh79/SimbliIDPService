/* eslint-disable */ 

import Responses from 'config/responses';
import twilio from 'twilio';
import { Service } from 'typedi';
import { Logger } from 'config/logger';

@Service()
export class TwilioUtils {
    private _client: any;

    constructor () { 
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_ACCOUNT_TOKEN;  
        this._client = twilio(accountSid, authToken);  
    }

    public sendOtp = async (mobile: string) => {
        try {
            const response = await this._client.verify.services(process.env.TWILIO_SERVICE_SID)
                                                .verifications
                                                .create({ to: mobile, channel: 'sms'});
            return Responses[200](response);
        } catch (e) {
            throw e;
        }    
    }
    public verifyOtp = async (mobile: string,otp:string) => {
        try {
           Logger.info(otp)

           const response = await this._client.verify.services(process.env.TWILIO_SERVICE_SID).verificationChecks.create({
               to:mobile,code:otp
           })
           Logger.info(response)
           return Responses[200](response);   
            //                        
        } catch (e) {
            throw e;
        }    
    }
}