import { fn } from 'storybook/test';
import { TimePicker } from '../components/time-picker/TimePicker';

export default {
  title: 'Components/Time Picker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
};

export const Default = {
  args: {
    label: 'Pick a Time',
    name: 'default-timepicker',
  },
};
