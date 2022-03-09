import { Controller } from '../../decorators/controller.decorator';
import { Request, Response, NextFunction } from 'express';
import { IResponse } from 'types';
import { SendGridService } from 'services/email.service';
import { EmailDTO } from 'api/dto/email.dto';
import { Service } from 'typedi';
import { Post } from '../../decorators/route.decorator';

@Controller( '/email' )
@Service()
export default class EmailController {
	constructor ( private _sendgridService: SendGridService ) { }
    @Post( '' )
	public sendMail = async ( req: Request, res: Response, next: NextFunction ) => {
    		const response: IResponse = await this._sendgridService.sendMail( <EmailDTO>req.body );
    		return res.status( response.statusCode ).json( response );
    	};
}