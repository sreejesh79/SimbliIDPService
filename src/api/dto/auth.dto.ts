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

export interface ICryptoDTO {
    iv: string;
    content: string
}

export interface IOnboardingDTO {
    mobile: string;
    mobile_otp: string;
    otp_token: string;
    mobile_verified: number;
    email?: string;
    register_token?: string;
    link_roken?: string;
    link?: string;
    email_verified?: number;
}
export interface IMobileDTO {
    mobile: string;
    mobile_otp?: string;
    otp_token: string;
    mobile_verified: number;
    email?: string;
    register_token?: string;
    link_roken?: string;
    link?: string;
    email_verified?: number;
}