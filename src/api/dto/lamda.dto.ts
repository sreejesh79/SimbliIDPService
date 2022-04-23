import { IAccessTokenPayloadDTO, IMagiclinkPayloadDTO } from './auth.dto';

export interface KMSSignDTO {
    payload: IMagiclinkPayloadDTO | IAccessTokenPayloadDTO;
    headers: IKMSHeaders;
}

export interface KMSSignResponse {
    token: string;
}

export interface IKMSHeaders {
    keyId: string;
    token?: string;
}