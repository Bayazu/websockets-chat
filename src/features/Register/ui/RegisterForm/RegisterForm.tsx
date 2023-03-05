import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { register } from 'features/Register/model/services/register/register';
import { getRegisterState } from 'features/Register/model/selectors/getRegisterState/getRegisterState';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { protectedRoutePath } from 'shared/config/routeConfig/protectedRouteConfig';
import { registerActions } from '../../model/slice/registerSlice';
import cls from './RegisterForm.module.scss';

interface RegisterFormProps {
    className?: string;
}

export const RegisterForm = memo(({ className }: RegisterFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        username, password, error, isLoading,
    } = useSelector(getRegisterState);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(registerActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(registerActions.setPassword(value));
    }, [dispatch]);

    const onRegisterClick = useCallback(() => {
        dispatch(register({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(cls.RegisterForm, {}, [className])}>
            <Text title={t('Форма регистрации')} />
            {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
            <Input
                autofocus
                type="text"
                className={cls.input}
                placeholder={t('Введите username')}
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                type="text"
                className={cls.input}
                placeholder={t('Введите пароль')}
                onChange={onChangePassword}
                value={password}
            />
            <div className={cls.buttonWrapper}>
                <AppLink theme={AppLinkTheme.PRIMARY} to={protectedRoutePath.login}>
                    {t('Уже есть аккаунт?')}
                </AppLink>
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.registerBtn}
                    onClick={onRegisterClick}
                    disabled={isLoading}
                >
                    {t('Зарегистрироваться')}
                </Button>
            </div>
        </div>
    );
});
