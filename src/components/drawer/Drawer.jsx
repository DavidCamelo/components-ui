import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './drawer.css';
import { XIcon } from '../../icons';

export const Drawer = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && <div className="storybook-drawer-backdrop" onClick={onClose} />}
      <div className={`storybook-drawer ${isOpen ? 'open' : ''}`}>
        <button className="storybook-drawer-close" onClick={onClose}>
          <XIcon />
        </button>
        <div className="storybook-drawer-content">{children}</div>
      </div>
    </>
  );
};

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Drawer;
