import React, { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { backendURL } from 'shared/const/backendURL';
import cls from './Image.module.scss';
import imageFile from '../../../../public/static/images/defaultImage.jpg';

export enum ImageSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    BIG = 'big'
}
interface ImageProps {
    className?: string,
    pathName? : string,
    size? : ImageSize,
}

export const Image: FC<ImageProps> = (props) => {
    const { className, pathName, size = ImageSize.SMALL } = props;
    const mods : Record<string, boolean> = {
        [cls[size]]: true,
    };

    if (!pathName) {
        return (
            <div className={classNames(cls.Image, mods, [className])}>
                <img src={imageFile} alt="none" />
            </div>
        );
    }

    return (
        <div className={classNames(cls.Image, mods, [className])}>
            <img src={`${backendURL}/${pathName}`} alt="none" />
        </div>
    );
};
