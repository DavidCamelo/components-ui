import { fn } from 'storybook/test';

import ConfirmationModal from '../components/confirmation-modal/ConfirmationModal';

export default {
  title: 'Example/Confirmation Modal',
  component: ConfirmationModal,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    isOpen: true,
    onClose: fn(),
    onConfirm: fn(),
    title: 'Confirmation Modal',
    children: 'Are you sure you want to proceed with this action? This action cannot be undone.',
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
};

export const ConfirmationModalExample = {};
