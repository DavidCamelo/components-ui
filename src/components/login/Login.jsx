import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from '../card/Card';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { Alert } from '../alert/Alert';
import './login.css';

export const Login = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="storybook-login-container">
      <Card title="Login to Your Account">
        <form onSubmit={handleSubmit} className="storybook-login-form">
          {error && <Alert type="error" message={error} />}
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button primary label="Log In" type="submit" />
        </form>
      </Card>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  error: PropTypes.string,
};

Login.defaultProps = {
  error: null,
};

export default Login;
