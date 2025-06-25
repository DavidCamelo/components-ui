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
    menuItems: [], // No menu items when logged out
    onLoginClick: fn(),
  },
};

export const LoggedIn = {
    args: {
      title: 'ComponentLib',
      menuItems: [
        { name: 'Dashboard', href: '#', id: 'dashboard' },
        { name: 'Settings', href: '#', id: 'settings' },
      ],
      user: {
        name: 'Jane Doe',
        avatarUrl: 'https://placehold.co/40x40/EFEFEF/3A3A3A?text=JD'
      },
      onMenuItemClick: fn(),
      onLogout: fn(),
      onLoginClick: fn(),
    },
  };
