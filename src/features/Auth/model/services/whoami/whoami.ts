import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { authAPI } from 'features/Auth/api/authAPI';

export const whoami = createAsyncThunk<Omit<User, 'token'>, null, { rejectValue: string }>(
    'login/whoami',
    async (_, thunkAPI) => {
        try {
            // const response = await axios.get<User>('http://26.104.131.172:3010/whoami');

            const response = await authAPI.whoami();

            // localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.token);
            // // TODO удалить из локал стораге userID + из конфига аксиоса
            // localStorage.setItem(USER_ID, String(response.data.userId));
            thunkAPI.dispatch(userActions.initAuthData(response.data));

            return response.data;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
