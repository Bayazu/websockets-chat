export interface User {
    id: number;
    login: string;
    token: string;
    roles: string[];
}

export interface UserSchema {
    authData?: User;

}
