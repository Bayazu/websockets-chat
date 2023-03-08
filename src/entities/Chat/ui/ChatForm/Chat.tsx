import React, {
    FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { getUserAuthData } from 'entities/User';
import { Message } from 'entities/Chat/ui/MessageForm/Message';
import { Input } from 'shared/ui/Input/Input';
import { io, Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { webSocketsActions } from 'processes/model/webSockets';
import { getChannelsState } from 'entities/Channels/model/selectors/getChannelsState/getChannelsState';
import cls from './Chat.module.scss';

interface ChatProps {
    className?: string,
}
const socket : Socket = io('', {});
export const Chat: FC<ChatProps> = ({ className }) => {
    const [state, setState] = useState('');
    const user = useSelector(getUserAuthData);
    const { channels } = useSelector(getChannelsState);
    const urlRoomId = 10;
    const dispatch = useDispatch();

    const foundedChannel = useMemo(() => channels.find((room) => room.id === urlRoomId), [channels]);

    const allMessages = useMemo(() => {
        if (foundedChannel) {
            return (
                foundedChannel?.messages.map((message) => (
                    <Message
                        text={message.message}
                        userId={user.id}
                        userIdFromMessage={message.author.userId}
                    />
                ))
            );
        }
        return 'Сообщений нет';
    }, [foundedChannel, user.id]);

    const onChangeUsername = useCallback((value: string) => {
        setState(value);
    }, []);

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const onClick = () => {
        const newF = {
            authorId: user.id,
            message: state,
            roomId: urlRoomId,
        };
        setState('');
        dispatch(webSocketsActions.sendNewMessage(newF));
    };

    useEffect(() => {
        scrollToBottom();
    }, [state, allMessages]);

    return (
        <>
            <div className={classNames(cls.Chat, {}, [className])}>
                {allMessages}
                <div ref={messagesEndRef} />
            </div>
            <div className={cls.inputForm}>
                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder={!state && 'Написать сообщение...'}
                    onChange={onChangeUsername}
                    value={state}
                />
                <button onClick={onClick}>отправить</button>
            </div>
        </>

    );
};
