import { fn } from 'storybook/test';

import { Input } from '../components/input/Input';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    label: 'Input',
  },
};

export const Secondary = {
  args: {
    label: 'Input',
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'Input',
  },
};

export const Medium = {
  args:{
    size:'medium',
    label:'Input'
  }
};

export const Small = {
  args: {
    size: 'small',
    label: 'Input',
  },
};
