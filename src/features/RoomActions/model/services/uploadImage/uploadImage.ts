import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Image, roomActions } from 'features/RoomActions';

interface uploadImageProps {
    image : Blob;

}

// return (
//     axios({
//         method: "post",
//         url: backEndUrlForReq + `product/new`,
//         data: data,
//         headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`
//         },
//     }).then(function (response) {
//         return response
//     })
//         .catch(err => {
//             if (err.response) {
//                 return err.response
//             }
//         })
// )
// },
export const uploadImage = createAsyncThunk<Image, uploadImageProps, { rejectValue: string }>(
    'room/uploadImage',
    async ({ image }, thunkAPI) => {
        try {
            // eslint-disable-next-line max-len
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJheWF6dSIsInVzZXJJZCI6NSwiaWF0IjoxNjc4MTMzNzcwLCJleHAiOjE2NzgyMjAxNzB9.yFZQpvN1qOh55nDnP5VFts7O4XeNvT736CbB1PxPIZI';
            const formData = new FormData();

            formData.append('image', image);
            formData.append('type', 'room_avatar');

            // const response = await axios.post<Image>('http://26.104.131.172:3010/image', formData);

            const response = await axios({
                method: 'post',
                url: 'http://26.104.131.172:3010/image',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                    'x-user-id': 5,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            // TODO добавить новую комнату ко всем канналам .setAuthData(response.data)
            thunkAPI.dispatch(roomActions.setImageData(response.data));

            return response.data;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
