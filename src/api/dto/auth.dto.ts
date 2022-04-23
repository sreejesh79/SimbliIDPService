export interface IOtpDTO {
    mobile: string;
    otp?: string;
    otp_token?: string;
    otp_expiry?: number;
}

export interface IMagiclinkPayloadDTO {
    fullname: string;
    email: string;
    mobile: string;
    password: string;
}

export interface IAccessTokenPayloadDTO {
    email: string;
}

export interface IMagiclinkDTO {
    token: string;
}