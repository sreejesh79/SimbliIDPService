import { OtpDTO } from 'api/dto/otp.dto';
import { Repository } from 'typeorm';
import { EmailsotpEntity } from '../entity/emailsotp.entity';
import { Service } from 'typedi';
import { masterDBConnection } from '../../config/db';
import { IRepository } from './base.repository';
import { Logger } from 'config/logger';

@Service()
export class EmailsOTPRepository implements IRepository {

	getRepository = (): Repository<EmailsotpEntity> => {
		return masterDBConnection().getRepository( EmailsotpEntity );
	};

	public updateEmailOtp = async ( data: OtpDTO ): Promise<EmailsotpEntity> => {
		Logger.debug( data );
		let emailOtp: EmailsotpEntity = await this.getByEmail( data.email );

		const repo: Repository<EmailsotpEntity> = this.getRepository();
		if ( !emailOtp ) {
			emailOtp = await repo.save( data );
		} else {
			//  emailOtp = await this.getRepository().save(emailOtp, data);
			repo.merge( emailOtp, data );
			emailOtp = await repo.save( emailOtp );
		}
		return emailOtp;
	};

	public getByEmail = async ( email: string ): Promise<EmailsotpEntity> => {
		const result: EmailsotpEntity = await this.getRepository().findOne( { email } );
		return result;
	};

}