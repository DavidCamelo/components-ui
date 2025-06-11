import { fn } from 'storybook/test';

import Modal from '../components/modal/Modal';

export default {
  title: 'Example/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    isOpen: true,
    onClose: fn(),
    title: 'Modal Title',
    children: 'This is the content of the modal.',
  }
};

export const ModalExample = {};
