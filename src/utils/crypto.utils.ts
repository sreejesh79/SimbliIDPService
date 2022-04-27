/* eslint-disable */
import { Service } from 'typedi';
import * as crypto from "crypto";
import { Logger } from 'config/logger';
import { ICryptoDTO } from 'api/dto/auth.dto';

@Service()
export class CryptoUtils {

    private readonly AES_ALGORITHM = 'aes-256-cbc';
    private _key = crypto.randomBytes(32);
    private _iv = crypto.randomBytes(16);
   
    public encrypt = (data: any): ICryptoDTO => {
        const cipher = crypto.createCipheriv(this.AES_ALGORITHM, this._key, this._iv);
        Logger.debug( this._key.toString('hex'));
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        const returnData: ICryptoDTO = {
            iv: this._iv.toString('hex'),
            content: encrypted.toString('hex')
        }
        Logger.debug(JSON.stringify(returnData));
        return returnData;
    }

    public decrypt = (data: ICryptoDTO) => {
        try {
            const decipher = crypto.createDecipheriv(this.AES_ALGORITHM, this._key, data.iv);
            const decrpyted = Buffer.concat([decipher.update(data.content, 'base64'), decipher.final()]);
            return decrpyted.toString();
        } catch (e) {
            throw e;
        }
    }
}