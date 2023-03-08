import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_ID, USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { UserSchema, User } from '../types/user';

const initialState: UserSchema = {
    // authData: {
    //     id: 5,
    //     // eslint-disable-next-line max-len
    //     token: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJheWF6dSIsInVzZXJJZCI6NSwiaWF0IjoxNjc4MzAxMDU0LCJleHAiOjE2NzgzODc0NTR9.pYBWtS0lQLDk2C3lRRz4KRZkgWv52viVWyCo3HyHhRI"',
    //     login: 'bayazu',
    //     roles: ['user'],
    // },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            // state.authData.isAuth = true;
        },
        initAuthData: () => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                // TODO запрос на авторизацию
                // state.authData = JSON.parse(user);
            }
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            localStorage.removeItem(USER_ID);
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
