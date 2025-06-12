import { fn } from 'storybook/test';

import { Tabs } from '../components/tabs/Tabs';

export default {
  title: 'Example/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    tabs: [
      { name: 'users', label: 'Users' },
      { name: 'products', label: 'Products' },
    ],
    activeTab: 'users',
    onTabClick: fn(),
  },
};

export const TabsExample = {};

export const TabsExample2 = {};
