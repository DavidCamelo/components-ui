import { fn } from 'storybook/test';
import { Button } from '../components/button/Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
};

export const Default = {
  args: {
    label: 'Button',
  },
};

export const Large = {
  args: {
    primary: false,
    size: 'large',
    label: 'Button',
  },
};

export const Small = {
  args: {
    primary: false,
    size: 'small',
    label: 'Button',
  },
};
