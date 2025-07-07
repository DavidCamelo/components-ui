import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from '../alert/Alert';
import { Button } from '../button/Button';
import { Checkbox } from '../checkbox/Checkbox';
import { DatePicker } from '../date-picker/DatePicker';
import { DateTimePicker } from '../date-time-picker/DateTimePicker';
import { Input } from '../input/Input';
import { MultiSelect } from '../multi-select/MultiSelect';
import { RadioButton } from '../radio-button/RadioButton';
import { Select } from '../select/Select';
import { Spinner } from '../spinner/Spinner';
import { TimePicker } from '../time-picker/TimePicker';
import { Toggle } from '../toggle/Toggle';
import './form.css';

const componentMap = {
  text: Input,
  number: Input,
  password: Input,
  email: Input,
  select: Select,
  checkbox: Checkbox,
  toggle: Toggle,
  multiSelect: MultiSelect,
  radio: RadioButton,
  date: DatePicker,
  time: TimePicker,
  'datetime-local': DateTimePicker,
};

export const Form = ({ fields, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialFormState = {};
    fields.forEach(field => {
        const { name, type, defaultValue } = field;
        let initialValue = initialData?.[name];

        if (initialValue !== undefined && initialValue !== null) {
            if (type === 'select' && typeof initialValue === 'object' && 'id' in initialValue) {
                initialFormState[name] = initialValue.id;
            } else if (type === 'multiSelect' && Array.isArray(initialValue)) {
                initialFormState[name] = initialValue.map(item => (typeof item === 'object' && 'id' in item ? item.id : item));
            } else {
                initialFormState[name] = initialValue;
            }
        } else {
            initialFormState[name] = defaultValue ?? (type === 'multiSelect' ? [] : type === 'checkbox' || type === 'toggle' ? false : '');
        }
    });
    setFormData(initialFormState);
  }, [fields, initialData]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (field) => {
    const { name, type, required, ...rest } = field;
    const Component = componentMap[type];

    if (!Component) {
      console.warn(`No component found for type: ${type}`);
      return null;
    }

    const value = formData[name];

    const props = {
      name,
      type,
      required: required || false,
      disabled: isLoading,
      ...rest,
    };

    if (type === 'checkbox' || type === 'toggle') {
      props.checked = !!value;
      props.onChange = (e) => handleChange(name, e.target.checked);
       if (type === 'toggle') {
          props.enabled = !!value;
          props.setEnabled = (enabled) => handleChange(name, enabled);
      }
    } else if (type === 'multiSelect') {
        props.selectedValues = value || [];
        props.onChange = (newValue) => handleChange(name, newValue);
    }
    else {
      props.value = value || '';
      props.onChange = (e) => handleChange(name, e.target.value);
    }

    if (type === 'radio') {
      return (
        <div key={name}>
            <span className="input-label">{field.label}</span>
            <div className="radio-group">
            {field.options.map(option => (
                <RadioButton
                key={option.value}
                label={option.label}
                name={name}
                value={option.value}
                checked={formData[name] === option.value}
                onChange={(e) => handleChange(name, e.target.value)}
                disabled={isLoading}
                />
            ))}
            </div>
        </div>
      );
    }

    return (
      <div key={name} className="form-field-wrapper">
        <Component {...props} />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <Alert type="error" message={error} />}
      {fields.map(renderField)}
      <div className="form-actions">
        {onCancel && <Button label="Cancel" onClick={onCancel} disabled={isLoading} />}
        <Button 
          primary 
          label={isLoading ? 'Submitting...' : 'Submit'} 
          type="submit"
          disabled={isLoading}
        />
        {isLoading && <Spinner size="small" />}
      </div>
    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.array,
    required: PropTypes.bool,
  })).isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

Form.defaultProps = {
  initialData: {},
  onCancel: null,
};

export default Form;
