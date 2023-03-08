import axios from 'axios';

const token = localStorage.getItem('user');
const userId = localStorage.getItem('userId');

export const instance = axios.create({
    baseURL: 'http://26.104.131.172:3010/',
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
        'x-user-id': userId,
    },
});
