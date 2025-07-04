import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { Alert } from '../alert/Alert';
import { Spinner } from '../spinner/Spinner';
import './sign-up.css';

export const SignUp = ({ service, onSignUpSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const userData = await service.signup(formData.name, formData.lastName, formData.email, formData.password);
      onSignUpSuccess(userData);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-form-wrapper">
      <form onSubmit={handleSubmit} className="signup-form">
        {error && <Alert type="error" message={error} />}
        <Input
          label="First Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Jane"
          required
          disabled={isLoading}
          autocomplete="given-name"
        />
        <Input
          label="Last Name"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
          required
          disabled={isLoading}
          autocomplete="family-name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          disabled={isLoading}
          autocomplete="email"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          disabled={isLoading}
          autocomplete="new-password"
        />
        <div className="signup-actions">
           {onCancel && <Button label="Cancel" onClick={onCancel} disabled={isLoading} />}
           <Button primary label={isLoading ? 'Creating Account...' : 'Sign Up'} type="submit" disabled={isLoading} />
           {isLoading && <Spinner size="small" />}
        </div>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  onSignUpSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

SignUp.defaultProps = {
  onCancel: null,
};

export default SignUp;
