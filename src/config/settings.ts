import * as project from '../../package.json';
import * as path from 'path';

class Settings {

	public static readonly PROJECT_NAME: string = project.name;
	public static readonly LOG_FOLDER_PATH: string = path.join( __dirname, '../../.logs' );
}

export default Settings;