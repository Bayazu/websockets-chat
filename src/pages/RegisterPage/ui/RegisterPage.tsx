import React, { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { RegisterForm } from 'features/Register';
import cls from './RegisterPage.module.scss';

interface RegisterPageProps {
    className?: string,
}

const RegisterPage: FC<RegisterPageProps> = ({ className }) => (
    <div className={classNames(cls.RegisterPage, {}, [className])}>
        <RegisterForm />
    </div>
);

export default RegisterPage;
