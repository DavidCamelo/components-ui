import React from 'react';
import PropTypes from 'prop-types';
import './badge.css';

export const Badge = ({ label, color }) => {
  return (
    <span className="storybook-badge" style={{ backgroundColor: color }}>
      {label}
    </span>
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Badge.defaultProps = {
  color: '#e5e7eb',
};

export default Badge;
