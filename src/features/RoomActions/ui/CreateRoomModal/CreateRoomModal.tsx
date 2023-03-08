import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { CreateRoomForm } from 'features/RoomActions/ui/CreateRoomForm/CreateRoomForm';

interface CreateRoomModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const CreateRoomModal = ({ className, isOpen, onClose }: CreateRoomModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <CreateRoomForm />
    </Modal>
);
