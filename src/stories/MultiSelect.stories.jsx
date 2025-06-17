import React from 'react';
import { fn } from 'storybook/test';
import { MultiSelect } from '../components/multi-select/MultiSelect';

export default {
  title: 'Example/Multi Select',
  component: MultiSelect,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
};

const Template = (args) => {
  const [selected, setSelected] = React.useState(args.selectedValues);
  return <MultiSelect {...args} selectedValues={selected} onChange={setSelected} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Technologies',
  options: [
    { value: 'js', label: 'JavaScript' },
    { value: 'py', label: 'Python' },
    { value: 'rb', label: 'Ruby' },
    { value: 'go', label: 'Go' },
  ],
  selectedValues: ['js'],
};