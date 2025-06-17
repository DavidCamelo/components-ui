import { fn } from 'storybook/test';
import { DatePicker } from '../components/date-picker/DatePicker';

export default {
  title: 'Example/Date Picker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
};

export const Default = {
  args: {
    label: 'Pick a Date',
    name: 'default-datepicker',
  },
};
