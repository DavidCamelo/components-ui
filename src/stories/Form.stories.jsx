import { fn } from 'storybook/test';

import { Form } from '../components/form/Form';

export default {
  title: 'Example/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'age', label: 'Age', type: 'number' },
      { name: 'type', label: 'Type', type: 'select', placeholder: 'Select a type', options: [ { id: 1, type: 'Type 1' }, { id: 2, type: 'Type 2' } ].map(u => ({ value: u.id, label: `${u.type}` }))},
    ],
    initialData: { name: 'John Doe', age: 35, type: { id : 2 } },
    onSave: fn(),
    onCancel: fn(),
  },
};

export const Default = {};
