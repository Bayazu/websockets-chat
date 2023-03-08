import { StateSchema } from 'app/providers/StoreProvider';

export const getRoomState = (state: StateSchema) => state?.room;
