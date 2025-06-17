import React from 'react';
import { fn } from 'storybook/test';
import { Drawer } from '../components/drawer/Drawer';
import { Button } from '../components/button/Button';

export default {
  title: 'Example/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClose: fn(),
  },
};

const Template = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  return (
    <>
      <Button primary label="Open Drawer" onClick={() => setIsOpen(true)} />
      <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
  children: 'This is the content of the drawer.',
};
