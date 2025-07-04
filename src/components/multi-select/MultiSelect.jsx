import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './multi-select.css';
import { ChevronDownIcon } from '../../icons';

export const MultiSelect = ({ label, options, selectedValues, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const handleOptionToggle = (optionValue) => {
        const newSelectedValues = selectedValues.includes(optionValue)
            ? selectedValues.filter(v => v !== optionValue)
            : [...selectedValues, optionValue];
        onChange(newSelectedValues);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const getSelectedLabels = () => {
        if (selectedValues.length === 0) return placeholder;
        if (selectedValues.length > 2) return `${selectedValues.length} selected`;
        return options
            .filter(opt => selectedValues.includes(opt.value))
            .map(opt => opt.label)
            .join(', ');
    };

    return (
        <div className="multiselect-wrapper" ref={wrapperRef}>
            {label && <label className="multiselect-label">{label}</label>}
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="multiselect-button">
                <span className="multiselect-button-text">{getSelectedLabels()}</span>
                <ChevronDownIcon />
            </button>
            {isOpen && (
                <div className="multiselect-panel">
                    <ul className="multiselect-list">
                        {options.map(option => (
                            <li key={option.value} onClick={() => handleOptionToggle(option.value)} className="multiselect-option">
                                <input type="checkbox" checked={selectedValues.includes(option.value)} readOnly className="multiselect-option-checkbox" />
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

MultiSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

MultiSelect.defaultProps = {
  label: '',
  placeholder: 'Select options...'
};

export default MultiSelect;
