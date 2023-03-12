import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { backendURL } from 'shared/const/backendURL';

interface RegisterProps {
    username: string;
    password: string;
}

export const register = createAsyncThunk<User, RegisterProps, { rejectValue: string }>(
    'login/register',
    async (registerData, thunkAPI) => {
        try {
            const response = await axios.post<User>(`${backendURL}/auth/register`, {
                login: registerData.username,
                password: registerData.password,
            });

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.token);
            thunkAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);
