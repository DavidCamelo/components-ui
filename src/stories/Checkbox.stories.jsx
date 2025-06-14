import { fn } from 'storybook/test';
import { Checkbox } from '../components/checkbox/Checkbox';

export default {
  title: 'Example/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
};

export const Default = {
  args: {
    label: 'Checkbox',
    name: 'default-checkbox',
    checked: false,
  },
};

export const Checked = {
  args: {
    label: 'Checkbox',
    name: 'checked-checkbox',
    checked: true,
  },
};
