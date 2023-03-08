import { User } from 'entities/User';

export interface MessageAuthor {
    login : string,
    roles : string[],
    userId : number
}

export interface Message {
    date : number,
    author : MessageAuthor,
    message : string,
    roomId : number,
}

export interface Room{
    users : Omit<User, 'token'>[],
    messages : Message[],
    owner : Omit<User, 'token'>,
    title : string,
    image : string,
    imageId : number,
    customId : string,
    lastMessage : Message | null,
    id: number,
}

export interface ChannelsSchema {
    channels?: Room[];
    isLoading: boolean;
    error?: string;
}
