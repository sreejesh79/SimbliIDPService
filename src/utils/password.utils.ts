/* eslint-disable */ 

import bcrypt from 'bcrypt';
import { Service } from 'typedi';

@Service()
export class PasswordUtils {

	public hashPassword = async ( password: string ): Promise<string> => {
		const rounds = 10;
		const salt = await bcrypt.genSalt( rounds );
		const passwordHash: string = await bcrypt.hash( password, salt );
		return passwordHash;
	};

	public comparePassword = async ( password: string, hash: string ): Promise<boolean> => {
		const isValid: boolean = await bcrypt.compare( password, hash );
		return isValid;
	};
}