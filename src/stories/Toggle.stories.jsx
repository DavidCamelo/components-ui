import React from 'react';
import { fn } from 'storybook/test';
import { Toggle } from '../components/toggle/Toggle';

export default {
  title: 'Example/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const Template = (args) => {
    const [enabled, setEnabled] = React.useState(args.enabled);
    return <Toggle {...args} enabled={enabled} setEnabled={setEnabled} />
}

export const Default = Template.bind({});
Default.args = {
    label: 'Enable Feature',
    enabled: false
};
