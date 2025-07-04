import React from 'react';
import PropTypes from 'prop-types';
import './date-time-picker.css';

export const DateTimePicker = ({ label, name, size = 'medium', ...props }) => {
  return (
    <div className="datetimepicker-wrapper">
      {label && <label htmlFor={name} className="datetimepicker-label">{label}</label>}
      <input
        id={name}
        name={name}
        type="datetime-local"
        className={['datetimepicker-input', `datetimepicker-input--${size}`].join(' ')}
        {...props}
      />
    </div>
  );
};

DateTimePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

DateTimePicker.defaultProps = {
  label: '',
  size: 'medium',
};

export default DateTimePicker;
