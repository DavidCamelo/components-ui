import React from 'react';
import PropTypes from 'prop-types';
import './input.css';

export const Input = ({ label, name, size = 'medium', ...props }) => {
  return (
    <div className="input-wrapper">
      {label && <label htmlFor={name} className="input-label">{label}</label>}
      <input
        id={name}
        name={name}
        className={['input', `input--${size}`].join(' ')}
        {...props}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Input.defaultProps = {
  label: '',
  size: 'medium',
};

export default Input;
