export interface OtpDTO {
    email: string;
    otp?: string;
    otp_token?: string;
    expiry?: number;
}