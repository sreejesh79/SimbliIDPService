import { Controller } from '../../decorators/controller.decorator';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { Get } from '../../decorators/route.decorator';
import { Logger } from 'config/logger';

@Controller( '/' )
@Service()
export class MainController {

	@Get( '' )
	public  index = ( req: Request, res: Response, next: NextFunction ) =>{
			try {
				res.status( 200 ).send( 'Welcome to Simbli Express.' );
			} catch ( err ) {
				next( err );
			}
		};

}