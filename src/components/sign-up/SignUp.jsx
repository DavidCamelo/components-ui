import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '../form/Form';

const signUpFields = [
    { label: "First Name", name: "name", type: "text", placeholder: "Jane", required: true, autocomplete: "given-name" },
    { label: "Last Name", name: "lastName", type: "text", placeholder: "Doe", autocomplete: "family-name" },
    { label: "Email", name: "email", type: "email", placeholder: "you@example.com", required: true, autocomplete: "email" },
    { label: "Password", name: "password", type: "password", placeholder: "••••••••", required: true, autocomplete: "new-password" },
];

export const SignUp = ({ service, onSignUpSuccess, onCancel }) => {

    const handleSignUpSubmit = async (formData) => {
        const userData = await service.signup(formData.name, formData.lastName, formData.email, formData.password);
        onSignUpSuccess(userData);
    };

    return (
        <Form
            fields={signUpFields}
            onSubmit={handleSignUpSubmit}
            onCancel={onCancel}
        />
    );
};

SignUp.propTypes = {
  service: PropTypes.shape({
    signup: PropTypes.func.isRequired,
  }).isRequired,
  onSignUpSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

SignUp.defaultProps = {
  onCancel: null,
};

export default SignUp;
