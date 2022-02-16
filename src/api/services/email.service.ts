import Responses from 'config/responses';
import  sgMail, { MailDataRequired } from '@sendgrid/mail';
import { IResponse } from 'types';

export interface IEmailService {

    init(): void;
    sendMail( from: string, to: string, subject: string, html: string ): Promise<IResponse>
}

export class SendGridService implements IEmailService {
	private static _singleton = true;
	private static _instance: SendGridService;


	constructer () {
		if ( SendGridService._singleton ) {
			throw new SyntaxError( 'This is a singleton class. Please use SendGridService.instance instead!' );
		}
	}

	public static get instance (): SendGridService {
		if ( !this._instance ) {
			this._singleton = false;
			this._instance = new SendGridService();
			this._singleton = true;
		}
		return this._instance;
	}

	public init = (): void => {
		// console.log("process.env.SENDGRID_API_KEY", process.env.SENDGRID_API_KEY);
		sgMail.setApiKey( process.env.SENDGRID_API_KEY );
	};

	public sendMail = async ( from: string, to: string, subject: string, html: string ): Promise<IResponse> => {
		//  console.log(to, from, subject, html);
		const mailData: MailDataRequired = { to, from, subject, html };
		try {
			const response: unknown = await sgMail.send( mailData );
			return Responses[200]( response );
		} catch ( e: unknown ) {
			// console.log(e);
			return Responses[500]( e.toString() );
		}
	};
}