import React from 'react';

import PropTypes from 'prop-types';

import './input.css';

/** Primary UI component for user interaction */
export const Input = ({
  primary = false,
  backgroundColor = 'rgba(255, 255, 255, 0.5)',
  size = 'medium',
  label,
  ...props
}) => {
  const mode = primary ? 'storybook-input--primary' : 'storybook-input--secondary';
  return (
    <input
      type='text'
      placeholder={label}
      className={['storybook-input', `storybook-input--${size}`, mode].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    />
  );
};

Input.propTypes = {
  /** Is this the principal call to action on the page? */
  primary: PropTypes.bool,
  /** What background color to use */
  backgroundColor: PropTypes.string,
  /** How large should the input be? */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Input contents */
  label: PropTypes.string.isRequired,
  /** Optional click handler */
  onChange: PropTypes.func,
};
