import Responses from 'config/responses';
import  sgMail, { MailDataRequired } from '@sendgrid/mail';
import { IResponse } from 'types';
import { EmailDTO } from 'api/dto/email.dto';
import { Service } from 'typedi';


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
			const response: unknown = await sgMail.send( mailData );
			return Responses[200]( response );
		} catch ( e: unknown ) {
			// console.log(e);
			return Responses[500]( e.toString() );
		}
	};
}