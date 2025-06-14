import { fn } from 'storybook/test';

import { ResourcePage } from '../components/resource-page/ResourcePage';

import { testService } from '../services/api.js';

export default {
  title: 'Example/ResourcePage',
  component: ResourcePage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    title: 'User Management',
    resourceName: 'User',
    service: testService,
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'lastName', header: 'Last Name' },
    ],
    formFields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'lastName', label: 'Last Name', type: 'text' },
    ],
  },
};

export const Default = {};
