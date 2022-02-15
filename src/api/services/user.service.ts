
class UserService {
    private static _singleton = true;
    private static _instance: UserService;

    constructor () {
        if ( UserService._singleton ) {
            throw new SyntaxError( "This is a singleton class. Please use UserService.instance instead!" );
        }
    }

    public static get instance (): UserService{
        if ( !this._instance ) {
            this._singleton = false;
            this._instance = new UserService();
            this._singleton = true;
        }
        return this._instance;
    }
}

export default UserService;