import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_ID, USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
    'login/register',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post<User>('http://26.104.131.172:3010/auth/login', {
                login: authData.username,
                password: authData.password,
            });

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.token);
            localStorage.setItem(USER_ID, String(response.data.id));
            thunkAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
