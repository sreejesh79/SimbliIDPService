export interface OtpDTO {
    email: string;
    otp?: string;
    otp_token?: string;
    otp_expiry?: number;
}
export interface OtpMobileDTO {
    mobile: string;
    otp?: string;
    otp_token: string;
    otp_expiry?: number;
    mobile_verified: number
}
export interface IMobileDTO {
    mobile: string,
    otp_token: string,
    mobile_verified: number,
    otp: string
}