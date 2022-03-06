import Responses from 'config/responses';
import { IBaseEntity } from 'entity/baseentity';
import { Request, Response, NextFunction } from 'express';
import UsersService from 'services/users.service';
import { Service } from 'typedi';
import { Controller } from '../../decorators/controller.decorator';
import { Get } from '../../decorators/route.decorator';

@Controller( '/users' )
@Service()
export  default class UsersController {
	constructor ( private _userService: UsersService ) { }
    @Get( '/' )
	public get = async ( req: Request, res: Response, next: NextFunction  ) => {
    		try {
    			const response: IBaseEntity[] = await this._userService.getAll();
    			if ( response && response.length ) {
    				return res.json( Responses[200]( response ) );
    			} else {
    				return res.json( Responses[404]( 'Users not found' ) );
    			}
    		} catch ( e: unknown ) {
    			next( e );
    		}
    	};
}