import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { CreateRoomForm } from 'features/RoomActions/ui/CreateRoomForm/CreateRoomForm';
import { ConnectRoomForm } from 'features/RoomActions/ui/ConnectRoomForm/ConnectRoomForm';

interface ConnectRoomModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ConnectRoomModal = ({ className, isOpen, onClose }: ConnectRoomModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <ConnectRoomForm />
    </Modal>
);
