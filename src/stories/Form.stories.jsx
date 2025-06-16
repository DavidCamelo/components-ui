import React from 'react';
import { fn } from 'storybook/test';
import { Form } from '../components/form/Form';

export default {
  title: 'Example/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
    onCancel: fn(),
   },
};

const sampleFields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter your full name'
  },
  {
    label: 'Age',
    name: 'age',
    type: 'number',
    placeholder: 'Enter your age'
  },
  {
    label: 'Birthdate',
    name: 'birthdate',
    type: 'date'
  },
  {
    label: 'Time',
    name: 'time',
    type: 'time'
  },
  {
    label: 'Update Time',
    name: 'updateTime',
    type: 'datetime'
  },
  {
    label: 'User Type',
    name: 'type',
    options: [
      { label: 'Type 1', value: 1 },
      { label: 'Type 2', value: 2 },
      { label: 'Type 3', value: 3 },
    ],
    placeholder: 'Select a type',
    type: 'select'
  },
  {
    label: 'Preferred Technologies',
    name: 'tech',
    options: [
        { value: 'js', label: 'JavaScript' },
        { value: 'py', label: 'Python' },
        { value: 'java', label: 'Java' },
    ],
    type: 'multiSelect'
  },
  {
    label: 'Enable Notifications',
    name: 'notifications',
    type: 'toggle'
  },
  {
    label: 'I agree to the terms',
    name: 'terms',
    type: 'checkbox'
  },
];

export const Default = {
  args: {
    fields: sampleFields,
  },
};

export const WithInitialData = {
  args: {
    fields: sampleFields,
    initialData: {
      name: 'John Doe',
      age: 35,
      birthdate: '1989-11-16',
      time: '14:30',
      updateTime: '2025-06-16T16:00:00',
      type: 2,
      tech: ['js', 'java'],
      notifications: true,
      terms: false,
    },
  },
};
