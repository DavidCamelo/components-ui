import { fn } from 'storybook/test';
import { Header } from '../components/header/Header';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const LoggedOut = {
  args: {
    title: 'ComponentLib',
    menuItems: [],
    onLogoutClick: fn(),
    onLoginClick: fn(),
    onSignUpClick: fn(),
  },
};

export const LoggedIn = {
  args: {
    title: 'ComponentLib',
    menuItems: [
      { name: 'Dashboard', href: '#' },
      { name: 'Settings', href: '#' },
    ],
      user: {
        name: 'Jane Doe',
        avatarUrl: 'https://placehold.co/40x40/EFEFEF/3A3A3A?text=JD'
      },
    onLogoutClick: fn(),
    onLoginClick: fn(),
    onSignUpClick: fn(),
  },
};
