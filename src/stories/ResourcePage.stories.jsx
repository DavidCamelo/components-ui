import React from 'react';
import { ResourcePage } from '../components/resource-page/ResourcePage';
import { Toggle } from '../components/toggle/Toggle';

export default {
  title: 'Example/Resource Page',
  component: ResourcePage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs']
};

// Mock service for Storybook
const createMockService = () => {
  let users = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    role: ['Admin', 'Editor', 'Viewer'][(i + 1) % 3],
    active: (i + 1) % 2 === 0,
  }));

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  return {
    getAll: async ({ pageNumber = 1, pageSize = 10 }) => {
      await delay(300);
      console.log(`Service: Fetching page ${pageNumber}, size ${pageSize}`);
      const start = (pageNumber - 1) * pageSize;
      const end = start + pageSize;
      const paginatedContent = users.slice(start, end);

      return {
        content: paginatedContent,
        pageable: {
          pageNumber: pageNumber - 1, // API is 0-indexed
          pageSize: pageSize,
        },
        totalElements: users.length,
        totalPages: Math.ceil(users.length / pageSize),
        size: pageSize,
        number: pageNumber - 1,
        numberOfElements: paginatedContent.length,
        first: pageNumber === 1,
        last: pageNumber >= Math.ceil(users.length / pageSize),
      };
    },
    create: async (newItem) => {
      await delay(300);
      const newEntry = { ...newItem, id: Math.max(0, ...users.map(d => d.id)) + 1 };
      users = [newEntry, ...users]; // Add to the beginning
      return newEntry;
    },
    update: async (id, updatedItem) => {
      await delay(300);
      users = users.map(item => (item.id === id ? { ...item, ...updatedItem } : item));
      return { id, ...updatedItem };
    },
    delete: async (id) => {
      await delay(300);
      if (id === 1) throw new Error("API Error: You do not have permission to delete this user.");
      users = users.filter(item => item.id !== id);
      return { id };
    },
  };
};

const userColumns = [
    { header: 'Name', key: 'name' },
    { header: 'Role', key: 'role' },
    { header: 'Status', key: 'active', render: (item) => <Toggle enabled={item.active} setEnabled={() => {}} /> }
];

const userFormFields = [
    { label: 'Full Name', name: 'name', type: 'text' },
    { label: 'Role', name: 'role', type: 'text' },
    { label: 'Active', name: 'active', type: 'toggle' },
];

const initialUsers = [
    { id: 1, name: 'John Doe (Admin)', role: 'Developer', active: true },
    { id: 2, name: 'Jane Smith', role: 'Designer', active: false },
];

export const UserManagement = {
  args: {
    title: 'User Management',
    resourceName: 'User',
    service: createMockService(initialUsers),
    columns: userColumns,
    formFields: userFormFields,
  },
};
