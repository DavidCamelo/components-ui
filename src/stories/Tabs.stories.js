import { expect, userEvent, within } from 'storybook/test';

import Tabs from '../components/tabs/Tabs';

export default {
  title: 'Example/Tabs',
  component: Tabs,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const TabsExample = {};
