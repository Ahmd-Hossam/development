export interface User {
    name: string;
    email: string;
    phone_number: string;
    gender: string;
    birth_date: string;
    address: string;
    password: string;
    //////////////
    token?: string;
    refresh?: string;

    id: 0;
    is_email_verified: boolean;
    is_phone_verified: boolean;
    balance: number;
}