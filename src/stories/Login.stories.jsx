import { fn } from 'storybook/test';
import { Login } from '../components/login/Login';

export default {
  title: 'Pages/Login',
  component: Login,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    onLogin: fn(),
  },
};

export const Default = {};

export const WithError = {
  args: {
    error: 'Invalid username or password.',
  },
};
