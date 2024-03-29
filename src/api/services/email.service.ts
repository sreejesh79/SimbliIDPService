import Responses from 'config/responses';
import  sgMail, { MailDataRequired } from '@sendgrid/mail';
import { IResponse } from 'types';
import { EmailDTO } from 'api/dto/email.dto';
import { Service } from 'typedi';
import { Logger } from 'config/logger';


export const sendgridInit = (): void => {
	sgMail.setApiKey( process.env.SENDGRID_API_KEY );
};

@Service()
export class SendGridService  {


	public sendMail = async ( data: EmailDTO ): Promise<IResponse> => {
		//  console.log(to, from, subject, html);
		// const mailData: MailDataRequired = { to, from, subject, html };
		const mailData: MailDataRequired = <MailDataRequired>data;
		try {
			if ( process.env.MODE !== 'debug' ) {
				const response: unknown = await sgMail.send( mailData );
				return Responses[200]( response );
			} else {
				return Responses[200]( {} );
			}
		} catch ( e: unknown ) {
			return Responses[500]( e.toString() );
		}
	};
}