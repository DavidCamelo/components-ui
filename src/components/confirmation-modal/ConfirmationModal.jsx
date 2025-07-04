import React from 'react';
import PropTypes from 'prop-types';
import './confirmation-modal.css';
import Modal from '../modal/Modal';
import Button from '../button/Button';

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="confirmation-content">
        {children}
      </div>
      <div className="confirmation-actions">
        <Button label="Cancel" size="small" onClick={onClose} />
        <Button primary label="Confirm" size="small" onClick={handleConfirm} />
      </div>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ConfirmationModal;
