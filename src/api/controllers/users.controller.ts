import { UsersDTO } from 'api/dto/users.dto';
import Responses from 'config/responses';
import { IBaseEntity } from 'entity/baseentity';
import { Request, Response, NextFunction } from 'express';
import UsersService from 'services/users.service';
import { Service } from 'typedi';
import { Controller } from '../../decorators/controller.decorator';
import { Get, Post } from '../../decorators/route.decorator';

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

	@Post( '/' )
	@Service()
    public save = async ( req: Request, res: Response, next: NextFunction ) => {
			try {
				const response: IBaseEntity = await this._userService.save( <UsersDTO>req.body );
				if ( response && response.id ) {
					return res.json( Responses[200]( response ) );
				} else {
					return res.json( Responses[500]( 'Something went wrong.' ) );
				}
			} catch ( e ) {
				next ( e );
			}
		};
}