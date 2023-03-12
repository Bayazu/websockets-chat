import { User } from 'entities/User';
import { instance } from 'shared/config/axios/axiosConfig';

export const authAPI = {
    whoami() {
        return instance.get<Omit<User, 'token'>>('auth/whoami');
    },
};
