import React from 'react';
import PropTypes from 'prop-types';
import './time-picker.css';

export const TimePicker = ({ label, name, size = 'medium', ...props }) => {
  return (
    <div className="timepicker-wrapper">
      {label && <label htmlFor={name} className="timepicker-label">{label}</label>}
      <input
        id={name}
        name={name}
        type="time"
        className={['timepicker-input', `timepicker-input--${size}`].join(' ')}
        {...props}
      />
    </div>
  );
};

TimePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

TimePicker.defaultProps = {
  label: '',
  size: 'medium',
};

export default TimePicker;
