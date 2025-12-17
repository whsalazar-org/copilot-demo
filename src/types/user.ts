export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}
