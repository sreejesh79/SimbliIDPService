import Responses from 'config/responses';
import { IBaseEntity } from 'entity/baseentity';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { Controller } from '../../decorators/controller.decorator';
import { Get } from '../../decorators/route.decorator';
import { RolesService } from 'services/roles.service';

@Controller( '/roles' )
@Service()
export default class RolesController {

	constructor ( private _rolesService: RolesService ) { }

    @Get( '/' )
	public  get = async ( req: Request, res: Response, next: NextFunction ) => {
    		try {
    			const response: IBaseEntity[] = await this._rolesService.get();
    			if ( response && response.length ) {
    				return res.json( Responses[200]( response ) );
    			}
    		} catch ( e ) {
    			return next( e );
    		}
    	};
}