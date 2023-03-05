export interface User {
    id: string;
    username: string;
    token: string;
    roles: string[];
}

export interface UserSchema {
    authData?: User;

}
