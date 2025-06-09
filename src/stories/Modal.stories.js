import { expect, userEvent, within } from 'storybook/test';

import Modal from '../components/modal/Modal';

export default {
  title: 'Example/Modal',
  component: Modal,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const ModalExample = {};
