import  { sendgridInit } from '../api/services/email.service';

class Bootstrap {

	public static init =  () => {
		sendgridInit();
	};
}

export default Bootstrap;