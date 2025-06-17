import React from 'react';
import PropTypes from 'prop-types';
import './spinner.css';

export const Spinner = ({ size }) => {
  return (
    <div className={`storybook-spinner storybook-spinner--${size}`} />
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Spinner.defaultProps = {
  size: 'medium',
};

export default Spinner;
