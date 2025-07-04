import React from 'react';
import PropTypes from 'prop-types';
import './checkbox.css';

export const Checkbox = ({ label, name, checked, onChange }) => {
  return (
    <label htmlFor={name} className="checkbox-wrapper">
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
      />
      <span className="checkbox-label">{label}</span>
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  checked: false,
};

export default Checkbox;
