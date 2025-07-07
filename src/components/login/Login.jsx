import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '../form/Form';

const loginFields = [
    { label: "Email or Username", name: "email", type: "text", placeholder: "you@example.com", required: true, autocomplete: "email" },
    { label: "Password", name: "password", type: "password", placeholder: "••••••••", required: true, autocomplete: "current-password" },
];

export const Login = ({ service, onLoginSuccess, onCancel }) => {

    const handleLoginSubmit = async (formData) => {
        const userData = await service.login(formData.email, formData.password);
        onLoginSuccess(userData);
    };

    return (
        <Form
            fields={loginFields}
            onSubmit={handleLoginSubmit}
            onCancel={onCancel}
        />
    );
};

Login.propTypes = {
  service: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }).isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

Login.defaultProps = {
  onCancel: null,
};

export default Login;