import { useParams } from 'react-router-dom';
import { Chat } from 'widgets/Chat';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { getChannelsState } from 'entities/Channels/model/selectors/getChannelsState/getChannelsState';
import React, { useMemo } from 'react';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
import cls from './MainPage.module.scss';

const MainPage = () => {
    const params = useParams();
    const roomId = Number(params.roomId);

    const user = useSelector(getUserAuthData);
    const { channels } = useSelector(getChannelsState);
    const currentRoom = useMemo(() => channels.find((room) => room.id === roomId), [channels, roomId]);

    return (
        <div className={cls.MainPage}>
            {channels.length === 0 || !currentRoom
                ? <PageLoader />
                : <Chat room={currentRoom} currentUser={user} messages={currentRoom.messages} />}

        </div>

    );
};

export default MainPage;
