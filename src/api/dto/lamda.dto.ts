import { IAccessTokenPayloadDTO, IIDTokenPayloadDTO, IMagiclinkPayloadDTO } from './auth.dto';

export interface KMSSignDTO {
    payload: IMagiclinkPayloadDTO | IIDTokenPayloadDTO | IAccessTokenPayloadDTO;
    headers: IKMSHeaders;
}

export interface KMSSignResponse {
    token: string;
}

export interface IKMSHeaders {
    keyId: string;
    token?: string;
}