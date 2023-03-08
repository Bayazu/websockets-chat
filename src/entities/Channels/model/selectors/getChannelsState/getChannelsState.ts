import { StateSchema } from 'app/providers/StoreProvider';

export const getChannelsState = (state: StateSchema) => state?.channels;
