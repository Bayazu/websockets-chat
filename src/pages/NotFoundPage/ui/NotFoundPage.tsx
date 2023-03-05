import React, { FC, ReactNode, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useNavigate } from 'react-router-dom';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string,
}

export const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
    const { t } = useTranslation();
    const isUserAuth = useSelector(getUserAuthData);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserAuth) {
            navigate('/login');
        }
    }, [isUserAuth, navigate]);

    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </div>

    );
};
