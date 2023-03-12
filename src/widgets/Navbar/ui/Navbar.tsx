import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useDispatch } from 'react-redux';
import { CreateRoomModal } from 'features/RoomActions';
import { ConnectRoomModal } from 'features/RoomActions/ui/ConnectRoomModal/ConnectRoomModal';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const [isFUCK, setISFUCK] = useState(false);
    const dispatch = useDispatch();

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                onClick={onShowModal}
            >
                {t('Создать комнату')}
            </Button>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                onClick={() => setISFUCK(true)}
            >
                {t('Подключиться к комнате')}
            </Button>
            <CreateRoomModal
                isOpen={isAuthModal}
                onClose={onCloseModal}
            />
            <ConnectRoomModal
                isOpen={isFUCK}
                onClose={() => setISFUCK(false)}
            />
        </div>
    );
};
