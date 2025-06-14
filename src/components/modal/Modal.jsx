import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './modal.css';
import { XIcon } from '../../icons';

export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.classList.add('modal-open');
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="storybook-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="storybook-modal-container"
        onClick={e => e.stopPropagation()}
      >
        <div className="storybook-modal-header">
          <h3 className="storybook-modal-title">{title}</h3>
          <button
            type="button"
            className="storybook-modal-close-button"
            onClick={onClose}
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="storybook-modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
