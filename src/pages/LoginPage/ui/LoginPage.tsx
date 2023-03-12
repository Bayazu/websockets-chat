import React, { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { LoginForm } from 'features/Auth';
import cls from './LoginPage.module.scss';

interface LoginPageProps {
    className?: string,
}

const LoginPage: FC<LoginPageProps> = ({ className }) => (
    <div className={classNames(cls.LoginPage, {}, [className])}>
        <LoginForm />
    </div>
);

export default LoginPage;
