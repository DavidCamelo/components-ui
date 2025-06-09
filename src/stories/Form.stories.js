import { expect, userEvent, within } from 'storybook/test';

import Form from '../components/form/Form';

export default {
  title: 'Example/Form',
  component: Form,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const FormExample = {};
