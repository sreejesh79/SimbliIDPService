import { IUserDTO } from 'api/dto/users.dto';
import {IMobileDTO} from 'api/dto/otp.dto'

    declare namespace NodeJS {
        export interface Global {
          __basepath: string;
        }
      }

      declare global {
        namespace Express {
          interface Request {
            user: IUserDTO;
            mobileOtp: IMobileDTO;
           }
        }
      }

