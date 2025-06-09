import { expect, userEvent, within } from 'storybook/test';

import Table from '../components/table/Table';

export default {
  title: 'Example/Table',
  component: Table,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const TableExample = {};
