class Utilityscripts {


    public static generateExpiry = ( minutesToAdd ): Date => {
        const currentDate: Date = new Date();
        const expiryDate: Date = new Date( currentDate.getTime() + minutesToAdd*60000 );
        // const expiryTime: number = expiryDate.getTime();
        return expiryDate;
    };

    public static checkExpiry = ( expiryDate: Date ): boolean => {
        const currentDate: Date  = new Date();
        //  console.log(expiryDate.getTime(), ':', currentDate.getTime());
        return ( expiryDate.getTime() > currentDate.getTime() );
    };
}


export default Utilityscripts;