import { fn } from 'storybook/test';
import { Input } from '../components/input/Input';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
};

export const Default = {
  args: {
    label: 'Text Input',
    name: 'default-input',
    placeholder: 'Type something...',
  },
};

export const Small = {
  args: {
    label: 'Small Input',
    name: 'small-input',
    size: 'small',
    placeholder: 'Small',
  },
};

export const Large = {
  args: {
    label: 'Large Input',
    name: 'large-input',
    size: 'large',
    placeholder: 'Large',
  },
};
