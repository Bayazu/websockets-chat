import React, { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Image, ImageSize } from 'shared/ui/Image/Image';
import cls from './Channel.module.scss';

interface ChannelProps {
    className?: string,
    collapsed?: boolean
    // room : Room
    room : any,
}

export const Channel: FC<ChannelProps> = ({ className, collapsed, room }) => (
    <div className={classNames(cls.Channel, { [cls.collapsed]: collapsed }, [className])}>
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={`/room/${room.id}`}
            className={classNames(cls.link, {}, [className])}
        >
            <div className={cls.channel}>
                <Image pathName={room.image} size={ImageSize.SMALL} className={cls.imageWrapper} />
                <div className={cls.text}>
                    <p>{room.title}</p>
                    <span>
                        {room.lastMessage
                            ? (
                                <div>
                                    <b>
                                        {room.lastMessage.author}
                                        :
                                    </b>
                                    {room.lastMessage.message}
                                </div>
                            )
                            : <p>Сообщений нет</p>}
                    </span>
                </div>
            </div>
        </AppLink>
    </div>
);
