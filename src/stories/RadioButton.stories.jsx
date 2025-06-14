import React from 'react';
import { fn } from 'storybook/test';
import { RadioButton } from '../components/radio-button/RadioButton';

export default {
  title: 'Example/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
};

const Template = (args) => {
    const [selectedValue, setSelectedValue] = React.useState('personal');
    return (
        <div style={{display: 'flex', gap: '1rem'}}>
            <RadioButton {...args} label="Personal" value="personal" checked={selectedValue === 'personal'} onChange={(e) => setSelectedValue(e.target.value)} />
            <RadioButton {...args} label="Business" value="business" checked={selectedValue === 'business'} onChange={(e) => setSelectedValue(e.target.value)} />
        </div>
    )
}

export const Default = Template.bind({});
Default.args = {
  name: 'accountType'
};
