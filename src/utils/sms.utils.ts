/* eslint-disable */ 

import Responses from 'config/responses';
import twilio from 'twilio';
import { Service } from 'typedi';

@Service()
export class TwilioUtils {
    private _client: any;

    constructor () { 
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;  
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
}