import React from 'react';
import PropTypes from 'prop-types';
import './alert.css';
import { InfoIcon, CheckCircleIcon, WarningIcon, XCircleIcon } from '../../icons';

const alertIcons = {
  info: <InfoIcon />,
  success: <CheckCircleIcon />,
  warning: <WarningIcon />,
  error: <XCircleIcon />,
};

export const Alert = ({ type, message }) => {
  return (
    <div className={`alert alert--${type}`}>
      <div className="alert-icon">{alertIcons[type]}</div>
      <span className="alert-message">{message}</span>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  message: PropTypes.string.isRequired,
};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
