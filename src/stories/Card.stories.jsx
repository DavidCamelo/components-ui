import React from 'react';
import { Card } from '../components/card/Card';
import { Button } from '../components/button/Button';
import { Input } from '../components/input/Input';

export default {
  title: 'Example/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    title: 'Example Card',
    children: (
      <>
        <p>This is the content inside the card.</p>
        <Input label="Name" name="name" />
        <Button primary label="Submit" />
      </>
    ),
  },
};

export const WithoutTitle = {
  args: {
    children: (
      <p>This card does not have a title. The content area adjusts accordingly.</p>
    ),
  },
};
