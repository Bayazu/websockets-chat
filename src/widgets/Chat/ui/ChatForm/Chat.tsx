import React, {
    memo, useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { User } from 'entities/User';
import { useDispatch } from 'react-redux';
import { webSocketsActions } from 'processes/model/webSockets';
import { Room } from 'entities/Channels';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { TextArea } from 'shared/ui/TextForm/TextArea';

import { Message } from 'widgets/Chat';
import { IMessage } from 'entities/Channels/model/types/channels';
import cls from './Chat.module.scss';

interface ChatProps {
    className?: string,
    room: Room,
    currentUser: User,
    messages: IMessage[]
}
export const Chat = memo((props: ChatProps) => {
    const {
        room, currentUser, messages, className,
    } = props;
    const dispatch = useDispatch();

    const [state, setState] = useState('');

    const allMessages = useMemo(() => {
        if (messages) {
            return (
                messages.map((message) => (
                    <Message
                        text={message.message}
                        userLogin={currentUser.login}
                        userLoginFromMessage={message.author}
                    />
                ))
            );
        }
        return 'Сообщений нет';
    }, [messages, currentUser.login]);

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const sendMessage = () => {
        dispatch(webSocketsActions.sendNewMessage({
            authorId: currentUser.userId,
            message: state,
            roomId: room.id,
        }));
        setState('');
    };

    const onChangeTextAreaMessage = useCallback((value: string) => {
        setState(value);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [state, messages]);

    return (
        <div className={cls.ChatWrapper}>
            <div className={cls.leftPart}>
                <div className={classNames(cls.Chat, {}, [className])}>
                    {allMessages}
                    <div ref={messagesEndRef} />
                </div>
                <div className={cls.messageForm}>
                    <div className={cls.textAreaWrapper}>
                        <TextArea
                            placeholder={!state && 'Написать сообщение...'}
                            value={state}
                            onChange={onChangeTextAreaMessage}
                        />
                    </div>
                    <Button onClick={sendMessage} theme={ButtonTheme.OUTLINE}>
                        Отправить
                    </Button>
                </div>
            </div>
            <div className={cls.rightPart} />
        </div>
    );
});
