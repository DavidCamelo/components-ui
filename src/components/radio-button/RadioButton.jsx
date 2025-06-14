import React from 'react';
import PropTypes from 'prop-types';
import './radio-button.css';

export const RadioButton = ({ label, name, value, checked, onChange }) => (
    <label htmlFor={`${name}-${value}`} className="storybook-radio-wrapper">
        <input id={`${name}-${value}`} name={name} type="radio" value={value} checked={checked} onChange={onChange} className="storybook-radio-input" />
        <span className="storybook-radio-label">{label}</span>
    </label>
);

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

RadioButton.defaultProps = {
  checked: false,
};

export default RadioButton;
