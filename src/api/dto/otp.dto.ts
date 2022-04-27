export interface OtpDTO {
    email: string;
    otp?: string;
    otp_token?: string;
    otp_expiry?: number;
}
export interface OtpMobileDTO {
    mobile: string;
}
export interface VerifyOtpMobileDTO {
    mobile: string;
    otp: string
}
