import { fn } from 'storybook/test';

import Table from '../components/table/Table';

export default {
  title: 'Example/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'age', header: 'Age' },
      { key: 'type', header: 'Type', render: (row) => row.type ? `${row.type.type}` : 'No type' },
    ],
    data: [ { name: 'John Doe', age: 35, type: { id: 2, type: 'Type 2' } }, { name: 'John Doe', age: 25, type: { id: 1, type: 'Type 1' } }, { name: 'John Doe', age: 50 } ],
    onEdit: fn(),
    onDelete: fn(),
  },
};

export const TableExample = {};
