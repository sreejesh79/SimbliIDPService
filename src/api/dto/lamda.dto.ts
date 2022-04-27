import { IAccessTokenPayloadDTO, ICryptoDTO } from './auth.dto';

export interface KMSSignDTO {
    payload: ICryptoDTO | IAccessTokenPayloadDTO;
    headers: IKMSHeaders;
}

export interface KMSSignResponse {
    token: string;
}

export interface IKMSHeaders {
    keyId: string;
    token?: string;
}