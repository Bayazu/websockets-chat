import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { RegisterSchema } from 'features/Register';

export interface StateSchema {
     user: UserSchema;
    loginForm: LoginSchema;
    registerForm : RegisterSchema;
}
