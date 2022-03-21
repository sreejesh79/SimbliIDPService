export interface UsersRegisterDTO {
    email: string;
    password?: string;
    mobile: string;
    refresh_token?: string;
}

export interface IUserDTO {
    id: number;
    email: string;
    mobile: string;
    password?: string;
    refresh_token: string;
    access_token?: string;
    created_at: number;
    updated_at: number;
}