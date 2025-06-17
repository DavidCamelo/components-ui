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
    <div className={`storybook-alert storybook-alert--${type}`}>
      <div className="storybook-alert-icon">{alertIcons[type]}</div>
      <span className="storybook-alert-message">{message}</span>
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
