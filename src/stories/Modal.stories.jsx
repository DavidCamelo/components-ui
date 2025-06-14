import React from 'react';
import { fn } from 'storybook/test';
import { Modal } from '../components/modal/Modal';
import { Button } from '../components/button/Button';

export default {
  title: 'Example/Modal',
  component: Modal,
  parameters: {
    layout: 'padded',
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
      <Button primary label="Open Modal" onClick={() => setIsOpen(true)} />
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
  title: 'Generic Modal',
  children: 'This is the content of the modal.',
};
