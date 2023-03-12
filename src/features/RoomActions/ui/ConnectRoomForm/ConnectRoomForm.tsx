import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useCallback, useState } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { getRoomState } from 'features/RoomActions/model/selectors/getRoomState/getRoomState';
import { roomActions } from 'features/RoomActions/model/slice/RoomActionsSlice';
import { createRoom } from 'features/RoomActions/model/services/createRoom/createRoom';
import { uploadImage } from 'features/RoomActions/model/services/uploadImage/uploadImage';
import { Image, ImageSize } from 'shared/ui/Image/Image';
import { webSocketsActions } from 'processes/model/webSockets';
import cls from './ConnectRoomForm.module.scss';

interface ConnectRoomFormProps {
    className?: string;
}

export const ConnectRoomForm = memo(({ className }: ConnectRoomFormProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [roomValue, setRoomValue] = useState('');
    // const dispatch = useDispatch();
    // const { isLoading, newRoom, error } = useSelector(getRoomState);

    // const onChangeTitle = useCallback((value: string) => {
    //     dispatch(roomActions.setTitle(value));
    // }, [dispatch]);
    //
    // const onChangeCustomId = useCallback((value: string) => {
    //     dispatch(roomActions.setCustomId(value));
    // }, [dispatch]);
    //
    // const onCreateRoomClick = useCallback(() => {
    //     dispatch(createRoom(newRoom));
    // }, [dispatch, newRoom]);
    //
    // const onUploadImage = useCallback((e) => {
    //     const file = e.target.files[0];
    //     dispatch(uploadImage({ image: file }));
    // }, [dispatch]);

    const onChange = (e : any) => {
        setRoomValue(e);
    };

    console.log(roomValue);

    const onSubmit = () => {
        dispatch(webSocketsActions.joinToNewRoom(roomValue));
    };

    return (
        <div className={classNames(cls.ConnectRoomForm, {}, [className])}>
            <div className={cls.leftSide}>
                <Text title={t('Создание комнаты')} />

                {/* {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />} */}
                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder={t('Введите название комнаты')}
                    onChange={onChange}
                    value={roomValue}
                />
                {/* <Input */}
                {/*    type="text" */}
                {/*    className={cls.input} */}
                {/*    placeholder={t('Введите id вашей комнаты')} */}
                {/*    onChange={onChangeCustomId} */}
                {/*    value={newRoom.customId} */}
                {/* /> */}
                {/* <div className={cls.upload}> */}
                {/*    <input onChange={onUploadImage} id="file" type="file" /> */}
                {/*    <label htmlFor="file"> */}
                {/*        {newRoom.originalFileName ? 'изменить картинку' : 'нажмите для загрузки картинки'} */}
                {/*    </label> */}
                {/* </div> */}
            </div>
            {/* <div className={cls.rightSide}> */}
            {/*    <div> */}
            {/*        /!* className={cls.circular_image} *!/ */}
            {/*        <Image pathName={newRoom.filePath} size={ImageSize.BIG} /> */}
            {/*    </div> */}

            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.createBtn}
                onClick={onSubmit}
                // disabled={isLoading}
            >
                {t('Подключиться к комнате')}
            </Button>
            {/* </div> */}

        </div>
    );
});
