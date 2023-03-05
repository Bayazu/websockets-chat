import React, { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import cls from './NavigateLink.scss';

export enum NavigateLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

interface NavigateLinkProps extends LinkProps {
    className?: string,
    theme?: NavigateLinkTheme,
}

// export const NavigateLink: FC<NavigateLinkProps> = (props) => {
//     const {
//         to, className, children, theme = NavigateLinkTheme.PRIMARY, ...otherProps
//     } = props;
//
//     return (
//         // <Link
//         //     to={to}
//         //     className={classNames(cls.AppLink, {}, [className, cls[theme]])}
//         //     {...otherProps}
//         // >
//         //     {children}
//         // </Link>
//     );
// };
