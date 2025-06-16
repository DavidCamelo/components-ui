import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import Input from '../input/Input';
import Select from '../select/Select';
import Checkbox from '../checkbox/Checkbox';
import Toggle from '../toggle/Toggle';
import MultiSelect from '../multi-select/MultiSelect';
import RadioButton from '../radio-button/RadioButton';
import DatePicker from '../date-picker/DatePicker';
import TimePicker from '../time-picker/TimePicker';
import DateTimePicker from '../date-time-picker/DateTimePicker';
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
  datetime: DateTimePicker,
};

export const Form = ({ fields, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialFormState = {};
    fields.forEach(field => {
        const { name, type, defaultValue } = field;
        const initialValue = initialData?.[name];

        if (initialValue !== undefined) {
             // Handle nested objects like { id: 2 } for selects
            if (type === 'select' && typeof initialValue === 'object' && initialValue !== null) {
                initialFormState[name] = initialValue.id;
            } else {
                initialFormState[name] = initialValue;
            }
        } else {
            initialFormState[name] = defaultValue ?? (type === 'multiSelect' ? [] : type === 'checkbox' || type === 'toggle' ? false : '');
        }
    });
    setFormData(initialFormState);
  }, [fields, initialData]);

  const handleChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field) => {
    const { name, type, ...rest } = field;
    const Component = componentMap[type];

    if (!Component) {
      console.warn(`No component found for type: ${type}`);
      return null;
    }

    const value = formData[name];

    // Props mapping for different component signatures
    const props = {
      name,
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

    // The RadioButton needs special handling since it's a group
    if (type === 'radio') {
      return (
        <div key={name}>
            <span className="storybook-input-label">{field.label}</span>
            <div className="storybook-radio-group">
            {field.options.map(option => (
                <RadioButton
                key={option.value}
                label={option.label}
                name={name}
                value={option.value}
                checked={formData[name] === option.value}
                onChange={(e) => handleChange(name, e.target.value)}
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
    <form onSubmit={handleSubmit} className="storybook-form">
      {fields.map(renderField)}
      <div className="storybook-form-actions">
        {onCancel && <Button label="Cancel" onClick={onCancel} />}
        <Button primary label="Submit" type="submit" onClick={handleSubmit}/>
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