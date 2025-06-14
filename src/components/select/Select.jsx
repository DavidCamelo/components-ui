import React from 'react';
import PropTypes from 'prop-types';
import './select.css';

export const Select = ({
  label,
  name,
  options,
  size = 'medium',
  ...props
}) => (
    <div className="storybook-select-wrapper">
        {label && <label htmlFor={name} className="storybook-select-label">{label}</label>}
        <select id={name} name={name} className={['storybook-select', `storybook-select--${size}`].join(' ')} {...props}>
            {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
    </div>
);

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Select.defaultProps = {
  label: '',
  size: 'medium',
};

export default Select;
