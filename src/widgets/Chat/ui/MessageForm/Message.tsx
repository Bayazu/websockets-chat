import React, { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Image, ImageSize } from 'shared/ui/Image/Image';
import cls from './Message.module.scss';

interface MessageProps {
    className?: string,
    text: string,

    userLogin : string,
    userLoginFromMessage : string
}

export const Message: FC<MessageProps> = (props) => {
    const {
        className, text, userLoginFromMessage, userLogin,
    } = props;

    const isMe = userLogin === userLoginFromMessage;

    const mods : Record<string, boolean> = {
        [cls.isMe]: isMe,
    };

    return (
        <div className={classNames(cls.Message, mods, [className])}>

            <Image size={ImageSize.SMALL} />
            <div className={cls.textWrapper}>
                <p>
                    {text}
                </p>
            </div>
        </div>
    );
};
