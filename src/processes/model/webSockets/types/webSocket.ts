import { Socket } from 'socket.io-client';

export type WebSocket = Socket | null;

export interface webSocketSchema {
    webSocket: WebSocket;
    isConnected : boolean;
    error?: string;
}

export interface SendMessage {
    authorId: number,
    message: string,
    roomId: number,
}
