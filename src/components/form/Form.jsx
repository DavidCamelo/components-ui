import React, { useState, useEffect } from 'react';
import './form.css';

const Form = ({ fields, initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(initialData || {});

    useEffect(() => {
        const defaultState = fields.reduce((acc, field) => {
            acc[field.name] = field.type === 'select' ? (initialData?.[field.name]?.id ?? '') : (initialData?.[field.name] ?? '');
            return acc;
        }, {});
        setFormData(initialData ? defaultState : {});
    }, [initialData, fields]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submissionData = { ...initialData };
        fields.forEach(field => {
            if (field.type === 'select') {
                const selectedOption = field.options.find(opt => opt.value === parseInt(formData[field.name]));
                submissionData[field.name] = { id: selectedOption.value, name: selectedOption.label };
            } else {
                submissionData[field.name] = formData[field.name];
            }
        });
        onSave(submissionData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map(field => (
                <div key={field.name} className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>{field.label}</label>
                    {field.type === 'select' ? (
                        <select
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">{field.placeholder}</option>
                            {field.options.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    )}
                </div>
            ))}
            <div className="flex items-center justify-end space-x-4 mt-6">
                <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save</button>
            </div>
        </form>
    );
};

export default Form;
