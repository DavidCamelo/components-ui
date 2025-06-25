import React, { useState } from 'react';
import { fn } from 'storybook/test';
import { Tabs } from '../components/tabs/Tabs';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const tabsData = [
  { name: 'Profile', content: <div>Profile content goes here.</div> },
  { name: 'Dashboard', content: <div>Dashboard content goes here.</div> },
  { name: 'Settings', content: <div>All your settings are here.</div> },
];

const Template = (args) => {
    const [activeTab, setActiveTab] = useState(args.activeTab || 0);
    return <Tabs {...args} activeTab={activeTab} onTabChange={setActiveTab} />
};

export const Default = Template.bind({});
Default.args = {
  tabs: tabsData,
  onTabChange: fn(),
};
