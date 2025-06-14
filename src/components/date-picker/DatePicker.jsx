import React from 'react';
import PropTypes from 'prop-types';
import './date-picker.css';

export const DatePicker = ({ label, name, size = 'medium', ...props }) => {
  return (
    <div className="storybook-datepicker-wrapper">
      {label && <label htmlFor={name} className="storybook-datepicker-label">{label}</label>}
      <input
        id={name}
        name={name}
        type="date"
        className={['storybook-datepicker-input', `storybook-datepicker-input--${size}`].join(' ')}
        {...props}
      />
    </div>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

DatePicker.defaultProps = {
  label: '',
  size: 'medium',
};

export default DatePicker;
