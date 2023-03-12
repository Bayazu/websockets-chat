import { User } from 'entities/User';

// export interface MessageAuthor {
//     login : string,
//     roles : string[],
//     userId : number
// }

export interface IMessage {
    date : number,
    author : string,
    message : string,
    roomId : number,
}

export interface Room{
    users : Omit<User, 'token'>[],
    messages : IMessage[],
    owner : Omit<User, 'token'>,
    title : string,
    image : string,
    imageId : number,
    customId : string,
    lastMessage : IMessage | null,
    id: number,
}

export interface ChannelsSchema {
    channels?: Room[];
    isLoading: boolean;
    error?: string;
}
