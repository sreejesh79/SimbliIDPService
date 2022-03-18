/* eslint-disable */ 

import Axios, { AxiosInstance } from 'axios';

export class HTTPUtils {
	public baseURL = '';
	public axiosApi!: AxiosInstance;

	constructor () {

	}

	protected init = (): any => {
		this.axiosApi = Axios.create( {
			baseURL: this.baseURL,
		} );
	};

	protected requestInterceptor (): any {
		this.axiosApi.interceptors.request.use(
			( config ) => {
				return config;
			},
			( error ) => {
				if ( error.request ) {
					// console.log( error.request );
				} else {
					// console.log( error.config );
				}
				return Promise.reject( error );
			},
		);
	}

	protected responseInerceptor (): any {
		this.axiosApi.interceptors.response.use(
			( response ) => {
				return response.data;
			},
			( error ) => {
				if ( error.response ) {
					if ( error.response.status === 401 ) {
						// const dispatch = useDispatch();
						// dispatch(AppSlice.actions.updateUserDetails({}));
					}
					return error.response.data;
				} else {
					error.config;
				}
			},
		);
	}
}