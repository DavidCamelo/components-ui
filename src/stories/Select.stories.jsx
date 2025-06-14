import { fn } from 'storybook/test';
import { Select } from '../components/select/Select';

export default {
  title: 'Example/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
};

export const Default = {
  args: {
    label: 'Category',
    name: 'category',
    options: [
      { value: 'tech', label: 'Technology' },
      { value: 'health', label: 'Health' },
      { value: 'finance', label: 'Finance' },
    ],
  },
};
