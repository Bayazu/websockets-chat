import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Image, newRoomSchema } from 'features/RoomActions/model/types/RoomActionsSchema';
import { createRoom } from 'features/RoomActions/model/services/createRoom/createRoom';

const initialState: newRoomSchema = {
    isLoading: false,
    newRoom: {
        title: '',
        imageId: 0,
        customId: '',
        filePath: '',
        originalFileName: '',
    },
};

export const RoomActionsSlice = createSlice({
    name: 'room/actions',
    initialState,
    reducers: {
        setTitle: ({ newRoom }, action: PayloadAction<string>) => {
            newRoom.title = action.payload;
        },
        setImageData: ({ newRoom }, action:PayloadAction<Image>) => {
            newRoom.imageId = action.payload.id;
            newRoom.filePath = action.payload.filePath;
            newRoom.originalFileName = action.payload.originalFileName;
        },
        setCustomId: ({ newRoom }, action: PayloadAction<string>) => {
            newRoom.customId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRoom.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createRoom.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: roomActions } = RoomActionsSlice;
export const { reducer: roomActionsReducer } = RoomActionsSlice;
