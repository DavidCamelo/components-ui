import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { Alert } from '../alert/Alert';
import { Spinner } from '../spinner/Spinner';
import './login.css';

export const Login = ({ service, onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const userData = await service.login(username, password);
      onLoginSuccess(userData);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="storybook-login-form-wrapper">
      <form onSubmit={handleSubmit} className="storybook-login-form">
        {error && <Alert type="error" message={error} />}
        <Input
          label="Username or Email"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={isLoading}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          disabled={isLoading}
        />
        <div className="storybook-login-actions">
           {onCancel && <Button label="Cancel" onClick={onCancel} disabled={isLoading} />}
           <Button primary label={isLoading ? 'Logging in...' : 'Log In'} type="submit" disabled={isLoading} />
           {isLoading && <Spinner size="small" />}
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  service: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }).isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  error: PropTypes.string,
};

Login.defaultProps = {
  onCancel: null,
  error: null,
};

export default Login;
