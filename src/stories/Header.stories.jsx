import { Header } from '../components/header/Header';

export default {
  title: 'Example/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    title: 'ComponentLib',
    menuItems: [
      { name: 'Home', href: '#' },
      { name: 'About', href: '#' },
      { name: 'Services', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  },
};
