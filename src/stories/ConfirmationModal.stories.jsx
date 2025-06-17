import React from 'react';
import { fn } from 'storybook/test';
import { ConfirmationModal } from '../components/confirmation-modal/ConfirmationModal';
import { Button } from '../components/button/Button';

export default {
  title: 'Example/Confirmation Modal',
  component: ConfirmationModal,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onClose: fn(),
    onConfirm: fn(),
  },
};

const Template = (args) => {
  const [isOpen, setIsOpen] = React.useState(args.isOpen);
  return (
    <>
      <Button primary label="Open Confirmation Modal" onClick={() => setIsOpen(true)} />
      <ConfirmationModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
  title: 'Confirm Action',
  children: 'Are you sure you want to perform this action?',
};