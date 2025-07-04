import React from 'react';
import PropTypes from 'prop-types';
import './date-picker.css';

export const DatePicker = ({ label, name, size = 'medium', ...props }) => {
  return (
    <div className="datepicker-wrapper">
      {label && <label htmlFor={name} className="datepicker-label">{label}</label>}
      <input
        id={name}
        name={name}
        type="date"
        className={['datepicker-input', `datepicker-input--${size}`].join(' ')}
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
