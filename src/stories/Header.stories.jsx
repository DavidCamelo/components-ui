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
    menuItems: [
      { name: 'Home', href: '#' },
      { name: 'About', href: '#' },
      { name: 'Services', href: '#' },
    ],
    onLoginClick: fn(),
  },
};

export const LoggedIn = {
  args: {
    ...LoggedOut.args,
    user: {
      name: 'Jane Doe',
      avatarUrl: 'https://placehold.co/40x40/EFEFEF/3A3A3A?text=JD'
    },
    onLogout: fn(),
  },
};
