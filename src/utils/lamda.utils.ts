/* eslint-disable */ 

import { Logger } from 'config/logger';
import { Service } from 'typedi';
import { HTTPUtils } from './http.utils';
import { KMSSignDTO } from '../api/dto/lamda.dto';
import { AxiosRequestHeaders } from 'axios';

@Service()
export class LamdaUtils extends HTTPUtils {

	constructor () {
		super();
		this.baseURL = process.env.API_GATEWAY_URL;
		this.init();
        this.requestInterceptor();
        this.responseInerceptor();
	}

	protected requestInterceptor (): any {
		this.axiosApi.interceptors.request.use(
			( config ) => {
				//  const access_token: string = authState.access_token;
				// console.log('access_token', access_token);
				// config.headers.Authorization = access_token ? access_token : '';
				// console.log('config', config);
				return config;
			},
			( error ) => {
				if ( error.request ) {
					// Logger.debug( error.request );
					// console.log( error.request );
				} else {
					// Logger.debug( error.config );

					// console.log( error.config );
				}
				return Promise.reject( error );
			},
		);
	}

	public kmsJwtSign = async ( data: KMSSignDTO ): Promise<any> => {
		const headers: unknown = data.headers;
		const response: any = await this.axiosApi.post( `${this.baseURL}/sign`, data.payload, {
			headers: <AxiosRequestHeaders>headers
		} );
		Logger.debug( `response: ${JSON.stringify(response)}` );
		return response;
	};


}