import { fn } from 'storybook/test';
import { DateTimePicker } from '../components/date-time-picker/DateTimePicker';

export default {
  title: 'Example/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
};

export const Default = {
  args: {
    label: 'Pick a Date and Time',
    name: 'default-datetimepicker',
  },
};
