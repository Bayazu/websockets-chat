export interface User {
    userId: number;
    login: string;
    token: string;
    // roles: string[];
}

export interface UserSchema {
    authData?: User;

}
