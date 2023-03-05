import React, { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ChatLink.module.scss';

interface ChatLinkProps {
    className?: string,
}

export const ChatLink: FC<ChatLinkProps> = ({ className }) => (
    <div className={classNames(cls.ChatLink, {}, [className])}>
        123
    </div>
);
