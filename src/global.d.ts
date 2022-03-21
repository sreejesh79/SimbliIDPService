import { IUserDTO } from 'api/dto/users.dto';

    declare namespace NodeJS {
        export interface Global {
          __basepath: string;
        }
      }

      declare global {
        namespace Express {
          interface Request {
            user: IUserDTO;
          }
        }
      }

