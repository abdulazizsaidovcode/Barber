import React from 'react';
import Modal from '../../modals/modal';

interface DelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete?: () => void;
}

const DelModal: React.FC<DelModalProps> = ({ isOpen, onClose, onDelete }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="w-[500px] h-[130px]">
                    <div className="flex justify-center">
                        <p className="text-xl text-black">Вы уверены что хотите удалить процедуру?</p>
                    </div>
                    <div className="flex justify-around mt-10">
                        <button onClick={onDelete} className="text-white bg-[#000] py-2 px-10">Удалить</button>
                        <button onClick={onClose} className="text-white bg-gray py-2 px-14">Нет</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DelModal;
