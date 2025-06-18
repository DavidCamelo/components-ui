import { Tabs } from '../components/tabs/Tabs';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    tabs: [
      { name: 'Profile', content: <div>Profile content goes here.</div> },
      { name: 'Dashboard', content: <div>Dashboard content goes here.</div> },
      { name: 'Settings', content: <div>All your settings are here.</div> },
    ],
  },
};
