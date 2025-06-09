import React from 'react';
import Modal from '../modal/Modal';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, children }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="text-slate-600 mb-6">
                {children}
            </div>
            <div className="flex items-center justify-end space-x-4">
                <button
                    onClick={onClose}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Delete
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
